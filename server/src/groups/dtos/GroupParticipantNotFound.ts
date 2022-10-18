import { HttpException, HttpStatus } from '@nestjs/common';

export class GroupParticipantsNotFound extends HttpException {
  constructor() {
    super('Group Participant Not Found', HttpStatus.NOT_FOUND);
  }
}
