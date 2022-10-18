import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { AddGroupRecipientDto } from '../dtos/AddGroupRecipient.dto';
import { IGroupRecipientService } from '../interfaces/group-recipient';

@Controller(Routes.GROUP_RECIPIENTS)
export class GroupRecipientsController {
  constructor(
    @Inject(Services.GROUP_RECIPIENTS)
    private readonly groupRecipientService: IGroupRecipientService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async addGroupRecipient(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() { email }: AddGroupRecipientDto,
  ) {
    const params = { id, userId, email };
    const response = await this.groupRecipientService.addGroupRecipient(params);
    this.eventEmitter.emit('group.user.add', response);
    return response;
  }

  @Delete(':userId')
  removeGroupRecipient(
    @AuthUser() { id: issuerId }: User,
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) removeUserId: number,
  ) {
    const params = { issuerId, id, removeUserId };
    return this.groupRecipientService.removeGroupRecipient(params);
  }
}
