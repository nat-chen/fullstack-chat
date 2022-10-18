import { ConversationNotFoundException } from './../exceptions/ConversationNotFound';
import { InvalidConversationIdException } from './../exceptions/InvalidConversationId';
import { IConversationsService } from 'src/conversations/conversations';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Services } from 'src/utils/constants';
import { AuthenticatedRequest } from 'src/utils/types';

@Injectable()
export class ConversationMiddleware implements NestMiddleware {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { id: userId } = req.user;
    const conversationId = parseInt(req.params.id);
    if (isNaN(conversationId)) throw new InvalidConversationIdException();
    const params = { conversationId, userId };
    const isReadable = await this.conversationsService.hasAccess(params);
    console.log(isReadable);
    if (isReadable) next();
    else throw new ConversationNotFoundException();
  }
}
