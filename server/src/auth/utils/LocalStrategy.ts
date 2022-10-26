import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Services } from 'src/utils/constants';
import { IAuthService } from '../auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {
    super(); // passport-local 策略默认接收请求体 username 和 password 属性，此处使用别名指定
  }
  async validate(username: string, password: string) {
    return this.authService.validateUser({ username, password });
  }
}
