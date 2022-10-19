import { FriendRequest } from 'src/utils/typeorm';
import { CreateFriendParams, FriendRequestParams } from './../utils/types';

export interface IFriendsRequestService {
  create(params: CreateFriendParams);
  isPending(userOneId: number, userTwoId: number);
  isFriends(userOneId: number, userTwoId: number);
  accept(params: FriendRequestParams);
  findById(id: number): Promise<FriendRequest>;
}
