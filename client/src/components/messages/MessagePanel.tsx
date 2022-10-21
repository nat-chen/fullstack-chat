import React, { FC, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { selectConversationById } from '../../store/conversationSlice';
import { selectGroupById } from '../../store/groupSlice';
import { createMessageThunk } from '../../store/messages/messageThunk';
import { postGroupMessage } from '../../utils/api';
import { AuthContext } from '../../utils/context/AuthContext';
import { getRecipientFromConversation } from '../../utils/helpers';
import { MessagePanelBody, MessagePanelFooter, MessagePanelStyle, MessageTypingStatus } from '../../utils/styles';
import { MessageContainer } from './MessageContainer';
import { MessageInputField } from './MessageInputField';
import { MessagePanelHeader } from './MessagePanelHeader';

type Props = {
  sendTypingStatus: () => void;
  isRecipientTyping: boolean;
}

export const MessagePanel: FC<Props> = ({ sendTypingStatus, isRecipientTyping }) => {
  const [content, setContent] = useState('');
  const { id: routeId } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const conversation = useSelector((state: RootState) => selectConversationById(state, parseInt(routeId!)));
  const group = useSelector((state: RootState) =>
  selectGroupById(state, parseInt(routeId!))
);
  const selectedType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const recipient = getRecipientFromConversation(conversation, user);
  const sendMessage = async () => {
    const trimmedContent = content.trim();
    if (!routeId || !trimmedContent) return;
    const id = parseInt(routeId);
    const params = { id, content: trimmedContent };

    switch (selectedType) {
      case 'private':
        return dispatch(createMessageThunk(params))
          .then(() => setContent(''))
          .catch((err) => console.log(err));
      case 'group':
        return postGroupMessage(params)
          .then(() => setContent(''))
          .catch((err) => console.log(err));
    }
  }
  return (
    <>
      <MessagePanelHeader />
      <MessagePanelStyle>
        <MessagePanelBody>
          <MessageContainer />
        </MessagePanelBody>{' '}
        <MessagePanelFooter>
          <MessageInputField
            content={content}
            setContent={setContent}
            sendMessage={sendMessage}
            sendTypingStatus={sendTypingStatus}
            placeholderName={
              selectedType === 'group'
                ? group?.title || 'Group'
                : recipient?.firstName || 'user'
            }
          />
          <MessageTypingStatus>
            {isRecipientTyping ? `${recipient?.firstName} is typing...` : ''}
          </MessageTypingStatus>
        </MessagePanelFooter>
      </MessagePanelStyle>
    </>
  )
}