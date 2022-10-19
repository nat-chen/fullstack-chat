import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Friend, FriendRequest } from 'src/utils/typeorm';
import { FriendRequestController } from './friend-requests.controller';
import { Services } from 'src/utils/constants';
import { FriendRequestService } from './friend-requests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Friend, FriendRequest]), UsersModule],
  controllers: [FriendRequestController],
  providers: [
    {
      provide: Services.FRIENDS_REQUESTS_SERVICE,
      useClass: FriendRequestService,
    },
  ],
})
export class FriendRequestsModule {}
