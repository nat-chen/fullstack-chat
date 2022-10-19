import { FriendRequestPending } from './exceptions/FriendRequestPending';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { Friend } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { IFriendsService } from './friends';
import { CreateFriendParams } from 'src/utils/types';

@Injectable()
export class FriendsService implements IFriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async createFriendRequest({ user: sender, email }: CreateFriendParams) {
    const receiver = await this.userService.findUser({ email });
    if (!receiver) throw new UserNotFoundException();
    const exists = await this.isFriendRequestPending(sender.id, receiver.id);
    if (exists) throw new FriendRequestPending();
    const friend = this.friendRepository.create({
      sender,
      receiver,
      status: 'pending',
    });
    return this.friendRepository.save(friend);
  }

  isFriendRequestPending(userOneId: number, userTwoId: number) {
    return this.friendRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          receiver: { id: userTwoId },
          status: 'pending',
        },
        {
          sender: { id: userTwoId },
          receiver: { id: userOneId },
          status: 'pending',
        },
      ],
    });
  }

  isFriends(userOneId: number, userTwoId: number) {
    return this.friendRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          receiver: { id: userTwoId },
          status: 'accepted',
        },
        {
          sender: { id: userTwoId },
          receiver: { id: userOneId },
          status: 'accepted',
        },
      ],
    });
  }
}
