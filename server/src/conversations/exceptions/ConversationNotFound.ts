import { HttpException, HttpStatus } from '@nestjs/common';

export class ConversationNotFoundException extends HttpException {
  constructor() {
    super('Conversation was not Found', HttpStatus.NOT_FOUND);
  }
}
