import { GroupMessage } from 'src/utils/typeorm';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'group_message_attachments' })
export class GroupMessageAttachment {
  @PrimaryGeneratedColumn('uuid')
  key: string;

  @ManyToOne(() => GroupMessage, (message) => message.attachment, {
    onDelete: 'CASCADE',
  })
  message: GroupMessage;
}
