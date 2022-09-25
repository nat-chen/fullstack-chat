import { CreateUserDetails, FindUserParams } from '../utils/types';
import { User } from 'src/utils/typeorm';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;

  findUser(findUserParams: FindUserParams): Promise<User>;

  saveUser(user: User): Promise<User>;
}
