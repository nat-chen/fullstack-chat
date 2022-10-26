import { IUserPresenceService } from './../interfaces/user-presence';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStatusMessageParams } from 'src/utils/types';
import { User, UserPresence } from 'src/utils/typeorm';
import { Services } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { IUserService } from '../interfaces/user';

@Injectable()
export class UserPresenceService implements IUserPresenceService {
  constructor(
    @InjectRepository(UserPresence)
    private readonly userPresenceRepository: Repository<UserPresence>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  createPresence(): Promise<UserPresence> {
    return this.userPresenceRepository.save(
      this.userPresenceRepository.create(),
    );
  }

  async updateStatus({
    user,
    statusMessage,
  }: UpdateStatusMessageParams): Promise<User> {
    if (!user.presence) {
      user.presence = await this.createPresence();
    }
    user.presence.statusMessage = statusMessage;
    return this.userService.saveUser(user);
  }
}
