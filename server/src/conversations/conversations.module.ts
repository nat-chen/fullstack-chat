import { Conversation } from './../utils/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Services } from '../utils/constants';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { UsersModule } from 'src/users/users.module';
import { isAuthorized } from 'src/utils/helpers';
import { ConversationMiddleware } from './middleware/conversation.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), UsersModule],
  controllers: [ConversationsController],
  providers: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
  ],
  exports: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
  ],
})
export class ConversationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthorized, ConversationMiddleware)
      .forRoutes('conversations/:id');
  }
}
