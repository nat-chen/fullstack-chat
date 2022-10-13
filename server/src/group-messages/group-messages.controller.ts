import { CreateMessageDto } from './../messages/dtos/CreateMessage.dto';
import {
  Body,
  Controller,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthUser } from 'src/utils/decorators';
import { Routes, Services } from 'src/utils/constants';
import { User } from 'src/utils/typeorm';
import { IGroupMessageService } from './group-messages';

@Controller(Routes.GROUP_MESSAGES)
export class GroupMessageController {
  constructor(
    @Inject(Services.GROUP_MESSAGES)
    private readonly groupMessageService: IGroupMessageService,
  ) {}

  @Post()
  async createGroupMessage(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() { content }: CreateMessageDto,
  ) {
    console.log(`Creating Group Message for ${id}`);
    await this.groupMessageService.createGroupMessage({
      author: user,
      groupId: id,
      content,
    });
  }
}
