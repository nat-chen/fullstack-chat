import { GroupMessageAttachment } from './../utils/typeorm/entities/GroupMessageAttachment';
import { MessageAttachment } from './../utils/typeorm/entities/MessageAttachment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { MessageAttachmentsService } from './message-attachments.service';
import { ImageStorageModule } from 'src/image-storage/image-storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageAttachment, GroupMessageAttachment]),
    ImageStorageModule,
  ],
  providers: [
    {
      provide: Services.MESSAGE_ATTACHMENTS,
      useClass: MessageAttachmentsService,
    },
  ],
  exports: [
    {
      provide: Services.MESSAGE_ATTACHMENTS,
      useClass: MessageAttachmentsService,
    },
  ],
})
export class MessageAttachmentsModule {}
