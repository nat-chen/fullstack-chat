import { GroupNotFoundException } from './../exceptions/GroupNotFound';
import { InvalidGroupException } from './../exceptions/InvalidGroup';
import { NextFunction } from 'express';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { AuthenticatedRequest } from 'src/utils/types';
import { IGroupService } from '../interfaces/group';

@Injectable()
export class GroupMiddleware implements NestMiddleware {
  constructor(
    @Inject(Services.GROUPS)
    private readonly GroupService: IGroupService,
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { id: userId } = req.user;
    const id = parseInt(req.params.id);

    if (isNaN(id)) throw new InvalidGroupException();
    const params = { id, userId };
    const user = await this.GroupService.hasAccess(params);
    console.log(user);
    if (user) next();
    else throw new GroupNotFoundException();
  }
}
