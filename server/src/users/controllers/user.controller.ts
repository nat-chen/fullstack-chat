import { IUserService } from 'src/users/interfaces/user';
import {
  Controller,
  Inject,
  HttpException,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { UserAlreadyExists } from '../exceptions/UserAlreadyExists';

@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  @Get('search')
  searchUsers(@Query('query') query: string) {
    if (!query) {
      throw new HttpException('Provide a valid query', HttpStatus.BAD_REQUEST);
    }
    return this.userService.searchUsers(query);
  }

  @Get('check')
  async checkUsername(@Query('username') username: string) {
    if (!username) {
      throw new HttpException('Invalid Query', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.findUser({ username });
    if (user) throw new UserAlreadyExists();
    return HttpStatus.OK;
  }
}
