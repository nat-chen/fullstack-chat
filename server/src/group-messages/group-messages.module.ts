import { Services } from 'src/utils/constants';
import { GroupMessageController } from './group-messages.controller';
import { Module } from '@nestjs/common';
import { Group, GroupMessage } from '../utils/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMessageService } from './group-messages.service';
import { GroupModule } from 'src/groups/group.module';

@Module({
  imports: [TypeOrmModule.forFeature([GroupMessage, Group]), GroupModule],
  controllers: [GroupMessageController],
  providers: [
    {
      provide: Services.GROUP_MESSAGES,
      useClass: GroupMessageService,
    },
  ],
})
export class GroupMessageModule {}
