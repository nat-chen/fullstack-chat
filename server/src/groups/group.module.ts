import { isAuthorized } from 'src/utils/helpers';
import { GroupMessageService } from './services/group-messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { GroupController } from './controllers/group.controller';
import { GroupService } from './services/group.service';
import { Group, GroupMessage } from 'src/utils/typeorm';
import { GroupMessageController } from './controllers/group-messages.controller';
import { GroupRecipientsController } from './controllers/group-recipients.controller';
import { GroupRecipientService } from './services/group-recipient.service';
import { GroupMiddleware } from './middleware/group.middleware';
import { MessageAttachmentsModule } from 'src/message-attachments/message-attachments.module';
import { ImageStorageModule } from 'src/image-storage/image-storage.module';

@Module({
  imports: [
    UsersModule,
    MessageAttachmentsModule,
    ImageStorageModule,
    TypeOrmModule.forFeature([Group, GroupMessage]),
  ],
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
export class GroupModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthorized, GroupMiddleware).forRoutes('groups/:id');
  }
}
