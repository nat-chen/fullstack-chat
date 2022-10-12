import { Message } from './entities/Message';
import { Conversation } from './entities/Conversation';
import { User } from './entities/User';
import { Session } from './entities/Session';
import { Group } from './entities/Group';

const entities = [User, Session, Conversation, Message, Group];

export default entities;

export { User, Session, Conversation, Message, Group };
