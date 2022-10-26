import { MessagingGateway } from './../gateway/gateway';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ServerEvents } from 'src/utils/constants';
import { RemoveFriendEventPayload } from 'src/utils/types';

@Injectable()
export class FriendEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent(ServerEvents.FRIEND_REMOVED)
  handleFriendRemoved({ userId, friend }: RemoveFriendEventPayload) {
    const { sender, receiver } = friend;
    const socket = this.gateway.sessions.getUserSocket(
      receiver.id === userId ? sender.id : receiver.id,
    );
    socket?.emit('onFriendRemoved', friend);
  }
}
