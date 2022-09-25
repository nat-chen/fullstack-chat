import { Participant } from './entities/Participant';
import { Conversation } from './entities/Conversation';
import { User } from './entities/User';
import { Session } from './entities/Session';

const entities = [User, Session, Conversation, Participant];

export default entities;

export { User, Session, Conversation, Participant };
