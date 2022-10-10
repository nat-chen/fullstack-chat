import React, { FC, useContext, useEffect, useState } from 'react';
import { formatRelative } from 'date-fns';
import { AuthContext } from '../../utils/context/AuthContext';
import { useSelector } from 'react-redux';
import { MessageContainerStyle, MessageItemAvatar, MessageItemContainer, MessageItemContent, MessageItemDetails, MessageItemHeader } from '../../utils/styles';
import { User, MessageType } from '../../utils/types';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { MessageMenuContext } from '../../utils/context/MessageMenuContext';
import { SelectedMessageContextMenu } from '../context-menus/SelectedMessageContextMenu';
import { EditMessageContainer } from './EditMessageContainer';
import { FormattedMessage } from './FormattedMessage';

export const MessageContainer = () => {
  const [showMenu, setShowModal] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
  const [selectedEditMessage, setSelectedEditMessage] = useState<MessageType | null>(null);
  const [originalEditMessage, setOriginalEditMessage] = useState(selectedEditMessage);
  const [isEditing, setIsEditing] = useState(false);
  const conversationMessages = useSelector((state: RootState) => state.messages.messages);
  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType,
  ) => {
    e.preventDefault();
    setShowModal(true);
    setPoints({ x: e.pageX, y: e.pageY });
    setSelectedMessage(message);
  };
  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedEditMessage) return;
    setSelectedEditMessage(
      (prev) => prev && { ...prev, content: e.target.value }
    );
  };
  useEffect(() => {
    const handleClick = () => setShowModal(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [id]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setIsEditing(false);
    window.addEventListener('keydown', handleKeydown);
  }, [id]);

  useEffect(() => {
    return () => {
      console.log('Unmounting');
      setSelectedMessage(null);
      setSelectedEditMessage(null);
      setIsEditing(false);
    }
  }, [id]);

  const formatMessages = () => {
    const msgs = conversationMessages.find((cm) => cm.id === parseInt(id!));
    if (!msgs) return [];
    return msgs?.messages?.map((m, index, arr) => {
      const nextIndex = index + 1;
      const currentMessage = arr[index];
      const nextMessage = arr[nextIndex];
      console.log(currentMessage);
      console.log(nextMessage);
      if (arr.length === nextIndex) {
        return <FormattedMessage
          onContextMenu={(e) => onContextMenu(e, m)}
          key={m.id}
          user={user}
          message={m}
          isEditing={isEditing}
          selectedEditMessage={selectedEditMessage}
          onEditMessageChange={onEditMessageChange}
        />;
      }
      if (currentMessage.author.id === nextMessage.author.id) {
        return (
          <MessageItemContainer key={m.id} onContextMenu={(e) => onContextMenu(e, m)}>
            {isEditing && m.id === selectedEditMessage?.id ? (
              <MessageItemContent padding="0 0 0 70px">
                <EditMessageContainer
                  selectedEditMessage={selectedEditMessage}
                  onEditMessageChange={onEditMessageChange}
                />
              </MessageItemContent>
            ) : (
              <MessageItemContent padding="0 0 0 70px">
                {m.content}
              </MessageItemContent>
            )}
          </MessageItemContainer>
        )
      }
      return (
        <FormattedMessage
          onContextMenu={(e) => onContextMenu(e, m)}
          key={m.id}
          user={user}
          message={m}
          isEditing={isEditing}
          selectedEditMessage={selectedEditMessage}
          onEditMessageChange={onEditMessageChange}
        />
      );
    });
  };

  return (
    <MessageMenuContext.Provider
      value={{
        message: selectedMessage,
        editMessage: selectedEditMessage,
        setMessage: setSelectedMessage,
        setEditMessage: setSelectedEditMessage,
      }}
    >
      <MessageContainerStyle>
        <>{formatMessages()}</>
        {showMenu && (
          <SelectedMessageContextMenu
            points={points}
            setIsEditing={setIsEditing}
          />
        )}
      </MessageContainerStyle>
    </MessageMenuContext.Provider>
  );
}