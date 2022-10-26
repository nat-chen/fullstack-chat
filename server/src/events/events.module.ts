import { GatewayModule } from './../gateway/gateway.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [GatewayModule],
  providers: [FriendRequestsEvents, FriendEvents],
})
export class EventsModule {}
