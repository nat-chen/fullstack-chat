import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { IUserService } from '../users/user';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { LocalAuthGuard, AuthenticateGuard } from './utils/Guards';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res: Response) {
    return res.send(HttpStatus.OK);
  }

  @UseGuards(AuthenticateGuard)
  @Get('status')
  status(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    res.send(req.user);
  }

  @Post('logout')
  logout() {}
}
