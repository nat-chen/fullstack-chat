import { Message } from './entities/Message';
import { Conversation } from './entities/Conversation';
import { User } from './entities/User';
import { Session } from './entities/Session';
import { GroupConversation } from './entities/GroupConversations';

const entities = [User, Session, Conversation, Message, GroupConversation];

export default entities;

export { User, Session, Conversation, Message, GroupConversation };
