import { Message } from './entities/Message';
import { Conversation } from './entities/Conversation';
import { User } from './entities/User';
import { Session } from './entities/Session';

const entities = [User, Session, Conversation, Message];

export default entities;

export { User, Session, Conversation, Message };
