import { MessagesService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Conversation, Message } from 'src/utils/typeorm';
import { MessageController } from './message.controller';
import { Services } from 'src/utils/constants';
import { FriendsModule } from 'src/friends/friends.module';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { ImageStorageModule } from 'src/image-storage/image-storage.module';
import { MessageAttachmentsModule } from 'src/message-attachments/message-attachments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Conversation]),
    ImageStorageModule,
    MessageAttachmentsModule,
    ConversationsModule,
    FriendsModule,
  ],
  controllers: [MessageController],
  providers: [
    {
      provide: Services.MESSAGES,
      useClass: MessagesService,
    },
  ],
})
export class MessagesModule {}
