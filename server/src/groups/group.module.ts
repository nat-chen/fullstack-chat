import { GroupMessageService } from './services/group-messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { GroupController } from './controllers/group.controller';
import { GroupService } from './services/group.service';
import { Group, GroupMessage } from 'src/utils/typeorm';
import { GroupMessageController } from './controllers/group-messages.controller';
import { GroupRecipientsController } from './controllers/group-recipients.controller';
import { GroupRecipientService } from './services/group-recipient.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Group, GroupMessage])],
  controllers: [
    GroupController,
    GroupMessageController,
    GroupRecipientsController,
  ],
  providers: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
    {
      provide: Services.GROUP_MESSAGES,
      useClass: GroupMessageService,
    },
    {
      provide: Services.GROUP_RECIPIENTS,
      useClass: GroupRecipientService,
    },
  ],
  exports: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
  ],
})
export class GroupModule {}
