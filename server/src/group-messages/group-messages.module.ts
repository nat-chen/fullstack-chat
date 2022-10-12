import { Services } from 'src/utils/constants';
import { GroupMessageController } from './group-messages.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/utils/typeorm';
import { GroupMessageService } from './group-messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [GroupMessageController],
  providers: [
    {
      provide: Services.GROUP_MESSAGES,
      useClass: GroupMessageService,
    },
  ],
})
export class GroupMessageModule {}
