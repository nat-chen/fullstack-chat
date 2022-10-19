import { FriendRequestNotFoundException } from './exceptions/FriendRequestNotFound';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound';
import { IUserService } from 'src/users/user';
import { FriendRequest } from './../utils/typeorm/entities/FriendRequest';
import { IFriendsRequestService } from './friend-requests';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { CreateFriendParams, FriendRequestParams } from 'src/utils/types';
import { FriendRequestPending } from 'src/friends/exceptions/FriendRequestPending';
import { FriendRequestAcceptedException } from './exceptions/FriendRequestAccepted';
import { FriendRequestException } from './exceptions/FriendRequest';

@Injectable()
export class FriendRequestService implements IFriendsRequestService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async create({ user: sender, email }: CreateFriendParams) {
    const receiver = await this.userService.findUser({ email });
    if (!receiver) throw new UserNotFoundException();
    const exists = await this.isPending(sender.id, receiver.id);
    if (exists) throw new FriendRequestPending();
    const friend = this.friendRequestRepository.create({
      sender,
      receiver,
      status: 'pending',
    });
    return this.friendRequestRepository.save(friend);
  }

  async accept({ id, userId }: FriendRequestParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.status === 'accepted') {
      throw new FriendRequestAcceptedException();
    }
    if (friendRequest.receiver.id !== userId) {
      throw new FriendRequestException();
    }
    friendRequest.status = 'accepted';
    await this.friendRequestRepository.save(friendRequest);
    const newFriend = this.friendRepository.create({
      sender: friendRequest.sender,
      receiver: friendRequest.receiver,
    });
    return this.friendRepository.save(newFriend);
  }

  isPending(userOneId: number, userTwoId: number) {
    return this.friendRequestRepository.findOne({
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
    return this.friendRequestRepository.findOne({
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

  findById(id: number): Promise<FriendRequest> {
    return this.friendRequestRepository.findOne(id, {
      relations: ['receiver', 'sender'],
    });
  }
}
