import { FriendRequest } from './entities/FriendRequest';
import { Friend } from './entities/Friend';
import { User } from './entities/User';
import { Message } from './entities/Message';
import { GroupMessage } from './entities/GroupMesage';
import { Group } from './entities/Group';
import { Conversation } from './entities/Conversation';
import { Session } from './entities/Session';

const entities = [
  User,
  Session,
  Conversation,
  Message,
  Group,
  GroupMessage,
  FriendRequest,
  Friend,
];

export default entities;

export {
  User,
  Session,
  Conversation,
  Message,
  Group,
  GroupMessage,
  Friend,
  FriendRequest,
};
