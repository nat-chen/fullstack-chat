import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  content: string;
}
