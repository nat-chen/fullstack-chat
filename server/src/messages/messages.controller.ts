import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { EditMessageDto } from './dtos/EditMessage';
import { IMessageService } from './messages';

@Controller(Routes.MESSAGES)
export class MessageController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: IMessageService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createMessage(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) conversationId: number,
    @Body() { content }: CreateMessageDto,
  ) {
    const params = { user, conversationId, content };
    const response = await this.messageService.createMessage(params);
    this.eventEmitter.emit('message.create', response);
    return;
  }

  @Get()
  async getMessagesFromConversation(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(id);
    const messages = await this.messageService.getMessagesByConversationId(id);
    return {
      id,
      messages,
    };
  }

  @Delete(':messageId')
  async deleteMessageFromConversation(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) conversationId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
  ) {
    await this.messageService.deleteMessage({
      userId: user.id,
      conversationId,
      messageId,
    });
    this.eventEmitter.emit('message.delete', {
      userId: user.id,
      messageId,
      conversationId,
    });
    return { conversationId, messageId };
  }

  // api/conversations/:conversationId/messages/:messageId
  @Patch(':messageId')
  async editMessage(
    @AuthUser() { id: userId }: User,
    @Param('id') conversationId: number,
    @Param('messageId') messageId: number,
    @Body() { content }: EditMessageDto,
  ) {
    const params = { userId, content, conversationId, messageId };
    const message = await this.messageService.editMessage(params);
    return message;
  }
}
