import { IUserService } from 'src/users/user';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { AccessParams, CreateConversationParams } from 'src/utils/types';
import { IConversationsService } from './conversations';
import { Services } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { ConversationNotFoundException } from './exceptions/ConversationNotFound';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async getConversations(id: number): Promise<Conversation[]> {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
      .leftJoinAndSelect('conversation.creator', 'creator')
      .leftJoinAndSelect('conversation.recipient', 'recipient')
      .where('creator.id = :id', { id })
      .orWhere('recipient.id = :id', { id })
      .orderBy('conversation.lastMessageSentAt', 'DESC')
      .getMany();
  }

  async findConversationById(id: number) {
    return this.conversationRepository.findOne({
      where: { id },
      relations: ['lastMessageSent', 'creator', 'recipient'],
    });
  }

  async isCreated(userId: number, recipientId: number) {
    return this.conversationRepository.findOne({
      where: [
        {
          creator: { id: userId },
          recipient: { id: recipientId },
        },
        {
          creator: { id: recipientId },
          recipient: { id: userId },
        },
      ],
    });
  }

  async createConversation(user: User, params: CreateConversationParams) {
    const { email, message: content } = params;

    const recipient = await this.userService.findUser({ email });

    if (!recipient) {
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);
    }
    if (user.id === recipient.id)
      throw new HttpException(
        'Cannot Create Conversation',
        HttpStatus.BAD_REQUEST,
      );

    const existingConversation = await this.isCreated(user.id, recipient.id);

    if (existingConversation)
      throw new HttpException('Conversation exists', HttpStatus.CONFLICT);

    const conversation = this.conversationRepository.create({
      creator: user,
      recipient: recipient,
    });

    const savedConversation = await this.conversationRepository.save(
      conversation,
    );
    const messageParams = { content, conversation, author: user };
    const message = this.messageRepository.create(messageParams);
    const savedMessage = await this.messageRepository.save(message);
    return savedConversation;
  }

  async hasAccess({ id, userId }: AccessParams) {
    const conversation = await this.findConversationById(id);
    if (!conversation) throw new ConversationNotFoundException();
    return (
      conversation.creator.id === userId || conversation.recipient.id === userId
    );
  }
}
