import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ConversationSearchbar, ConversationSidebarHeaderStyle, ConversationSidebarStyles, SidebarContainerStyle } from '../../utils/styles';
import { ConversationSidebarItem } from '../conversations/ConversationSidebarItem';
import { ConversationTab } from '../conversations/ConversationTab';
import { GroupSidebarItem } from '../groups/GroupSidebarItem';

export const ConversationSidebar = () => {
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  const groups = useSelector((state: RootState) => state.groups.groups);
  const selectedConversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  return (
    <ConversationSidebarStyles>
      <ConversationSidebarHeaderStyle>
        <ConversationSearchbar placeholder="Search for Conversations..." />
        <ConversationTab />
      </ConversationSidebarHeaderStyle>
      <div style={{ marginTop: '160px' }}>
        <SidebarContainerStyle>
          {selectedConversationType === 'private'
            ? conversations.map((conversation) => (
                <ConversationSidebarItem
                  key={conversation.id}
                  conversation={conversation}
                />
              ))
            : groups.map((group) => (
                <GroupSidebarItem key={group.id} group={group} />
              ))}
        </SidebarContainerStyle>
      </div>
    </ConversationSidebarStyles>
  )
}