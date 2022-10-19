import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateFriendDto } from './dto/CreateFriend.dto';
import { IFriendsService } from './friends';

@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendService: IFriendsService,
  ) {}

  @Post()
  createFriend(@AuthUser() user: User, @Body() { email }: CreateFriendDto) {
    const params = { user, email };
    return this.friendService.createFriendRequest(params);
  }
}
