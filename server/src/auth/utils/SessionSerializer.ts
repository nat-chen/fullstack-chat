/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { User } from 'src/utils/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {
    super();
  }
  serializeUser(user: any, done: Function) {
    console.log(user);
    console.log('SerializeUser');
    done(null, user);
  }
  async deserializeUser(user: User, done: Function) {
    console.log('DeserializeUser');
    console.log(user);
    const userDb = await this.userService.findUser({ id: user.id });
    console.log(userDb);
    return userDb ? done(null, userDb) : done(null, null);
  }
}

/*
验证的方式有两种：JWT 和 session
1. 官方文档使用 JWT
2. 继承 PassportServializer 使用 session
Passport uses `serializeUser` function to persist user data (after successful authentication) into session.
Function `deserializeUser` is used to retrieve user data from session.

passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user
});
*/
