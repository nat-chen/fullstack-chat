import { Module } from '@nestjs/common';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { UsersModule } from 'src/users/users.module';
import { ExistsController } from './exists.controller';

@Module({
  imports: [ConversationsModule, UsersModule],
  controllers: [ExistsController],
  providers: [],
})
export class ExistsModule {}
