import {
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateFriendDto } from './dto/CreateFriend.dto';
import { IFriendsRequestService } from './friend-requests';

@Controller(Routes.FRIEND_REQUESTS)
export class FriendRequestController {
  constructor(
    @Inject(Services.FRIENDS_REQUESTS_SERVICE)
    private readonly friendRequestService: IFriendsRequestService,
  ) {}

  @Get()
  getFriendRequests(@AuthUser() user: User) {
    return this.friendRequestService.getFriendRequests(user.id);
  }

  @Post()
  createFriendRequest(
    @AuthUser() user: User,
    @Body() { email }: CreateFriendDto,
  ) {
    const params = { user, email };
    return this.friendRequestService.create(params);
  }

  @Patch(':id/accept')
  acceptFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.friendRequestService.accept({ id, userId });
  }
}
