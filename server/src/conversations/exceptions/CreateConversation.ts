import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateConversationForm extends HttpException {
  constructor(msg?: string) {
    const defaultMessage = 'Create Conversation Exception';
    super(
      msg ? defaultMessage.concat(`:${msg}`) : defaultMessage,
      HttpStatus.BAD_REQUEST,
    );
  }
}
