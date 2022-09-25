import { Conversation, Participant } from './../utils/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { UsersModule } from 'src/users/users.module';
import { ParticipantsModule } from 'src/participants/participants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Participant]),
    ParticipantsModule,
    UsersModule,
  ],
  controllers: [ConversationsController],
  providers: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
  ],
})
export class ConversationsModule {}
