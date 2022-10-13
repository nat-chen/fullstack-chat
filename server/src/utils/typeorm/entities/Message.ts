import { Conversation } from 'src/utils/typeorm';
import { Entity, ManyToOne } from 'typeorm';
import { BaseMessage } from './BaseMessage';

@Entity({ name: 'messages' })
export class Message extends BaseMessage {
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
