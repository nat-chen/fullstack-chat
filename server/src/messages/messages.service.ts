import { instanceToPlain } from 'class-transformer';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageParams } from 'src/utils/types';
import { IMessageService } from './messages';

@Injectable()
export class MessagesService implements IMessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async createMessage({ user, content, conversationId }: CreateMessageParams) {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['creator', 'recipient', 'lastMessageSent'],
    });
    if (!conversation) {
      throw new HttpException('Conversation not found', HttpStatus.BAD_REQUEST);
    }
    const { creator, recipient } = conversation;
    console.log(`User ID: ${user.id}`);
    console.log(conversation);
    if (creator.id !== user.id && recipient.id !== user.id) {
      throw new HttpException('Cannot Create Message', HttpStatus.FORBIDDEN);
    }
    const message = this.messageRepository.create({
      content,
      conversation,
      author: instanceToPlain(user),
    });
    const savedMessage = await this.messageRepository.save(message);
    conversation.lastMessageSent = savedMessage;
    const updatedConversation = await this.conversationRepository.save(
      conversation,
    );
    return { message: savedMessage, conversation: updatedConversation };
  }

  getMessagesByConversationId(conversationId: number): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['author'],
      where: { conversation: { id: conversationId } },
      order: { createdAt: 'DESC' },
    });
  }
}
