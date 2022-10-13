import {
  CreateUserDetails,
  FindUserOptions,
  FindUserParams,
} from '../utils/types';
import { User } from 'src/utils/typeorm';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;

  findUser(
    findUserParams: FindUserParams,
    options?: FindUserOptions,
  ): Promise<User>;

  saveUser(user: User): Promise<User>;

  searchUsers(query: string): Promise<User[]>;
}
