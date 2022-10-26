import { WebsocketEvents } from './../../../client/src/utils/constants';
import { AcceptFriendRequestResponse } from './../../../client/src/utils/types';
import { MessagingGateway } from './../gateway/gateway';
import { FriendRequest } from 'src/utils/typeorm';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FriendRequestsEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent('friendrequest.create')
  friendRequestCreate(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getUserSocket(payload.receiver.id);
    receiverSocket && receiverSocket.emit('onFriendReceived', payload);
  }

  @OnEvent('friendrequest.cancel')
  handleFriendRequestCancel(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getUserSocket(payload.receiver.id);
    receiverSocket && receiverSocket.emit('onFriendRequestCancelled', payload);
  }

  @OnEvent(ServerEvents.FRIEND_REQUEST_ACCEPTED)
  handleFriendRequestAccepted(payload: AcceptFriendRequestResponse) {
    const senderSocket = this.gateway.sessions.getUserSocket(
      payload.friendRequest.sender.id,
    );
    senderSocket && senderSocket.emit(WebsocketEvents.FRIEND_REQUEST_ACCEPTED, payload);
  }

  @OnEvent(ServerEvents.FRIEND_REQUEST_ACCEPTED)
  handleFriendRequestRejected(payload: FriendRequest) {
    const senderSocket = this.gateway.sessions.getUserSocket(payload.sender.id);
    senderSocket &&
      senderSocket.emit(WebsocketEvents.FRIEND_REQUEST_REJECTED, payload);
  }
}
