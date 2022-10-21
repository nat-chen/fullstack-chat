import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { MessageContainerStyle, MessageItemContainer, MessageItemContent } from '../../utils/styles';
import { GroupMessageType, MessageType } from '../../utils/types';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { SelectedMessageContextMenu } from '../context-menus/SelectedMessageContextMenu';
import { EditMessageContainer } from './EditMessageContainer';
import { FormattedMessage } from './FormattedMessage';
import { selectConversationMessage } from '../../store/messages/messageSlice';
import { selectType } from '../../store/selectedSlice';
import { editMessageContent, resetMessageContainer, setIsEditing, setSelectedMessage } from '../../store/messageContainerSlice';
import { selectGroupMessage } from '../../store/groupMessageSlice';

export const MessageContainer = () => {
  const [showMenu, setShowModal] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const conversationMessages = useSelector((state: RootState) => selectConversationMessage(state, parseInt(id!)));
  const groupMessages = useSelector((state: RootState) => selectGroupMessage(state, parseInt(id!)));
  const selectedType = useSelector((state: RootState) => selectType(state));
  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType | GroupMessageType,
  ) => {
    e.preventDefault();
    setShowModal(true);
    setPoints({ x: e.pageX, y: e.pageY });
    dispatch(setSelectedMessage(message));
  };
  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(editMessageContent(e.target.value));
  useEffect(() => {
    const handleClick = () => setShowModal(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [id]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && dispatch(setIsEditing(false));
    window.addEventListener('keydown', handleKeydown);
    return () => {
      console.log('Removing keydown event listener');
      window.removeEventListener('keydown', handleKeydown);
    }
  }, [id]);

  useEffect(() => {
    return () => {
      console.log('Unmounting');
      dispatch(resetMessageContainer());
    }
  }, [id]);

  const mapMessages = (
    m: MessageType | GroupMessageType,
    index: number,
    messages: MessageType[] | GroupMessageType[]
  ) => {
    const nextIndex = index + 1;
    const currentMessage = messages[index];
    const nextMessage = messages[nextIndex];
    if (
      messages.length === nextIndex || currentMessage.author.id !== nextMessage.author.id
    ) {
      return (
        <FormattedMessage
          onContextMenu={(e) => onContextMenu(e, m)}
          key={m.id}
          user={user}
          message={m}
          onEditMessageChange={onEditMessageChange}
        />
      );
    }
    if (currentMessage.author.id === nextMessage.author.id) {
      return (
        <MessageItemContainer
          key={m.id}
          onContextMenu={(e) => onContextMenu(e, m) }
        >
          {isEditingMessage && m.id === messageBeingEdited?.id ? (
            <MessageItemContent padding="0 0 0 70px">
              <EditMessageContainer onEditMessageChange={onEditMessageChange} />
            </MessageItemContent>
          ) : (
            <MessageItemContent padding="0 0 0 70px">
              {m.content}
            </MessageItemContent>
          )}
        </MessageItemContainer>
      )
    }
  };

  const formatMessages = () => {
    if (selectedType === 'private') {
      return conversationMessages?.messages.map(mapMessages);
    }
    return groupMessages?.messages.map(mapMessages);
  };

  return (
    <MessageContainerStyle>
      <>{formatMessages()}</>
      {showMenu && <SelectedMessageContextMenu points={points} />}
    </MessageContainerStyle>
  );
}