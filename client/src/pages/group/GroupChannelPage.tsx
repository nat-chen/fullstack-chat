import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { SocketContext } from '../../utils/context/SocketContext';
import { ConversationChannelPageStyle } from '../../utils/styles';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { fetchGroupMessagesThunk } from '../../store/groupMessageSlice';

export const GroupChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const [isRecipientTyping] = useState(false);

  useEffect(() => {
    const groupId = parseInt(id!);
    dispatch(fetchGroupMessagesThunk(groupId));
  }, [id]);

  useEffect(() => {
    const groupId = id!;
    console.log(groupId)
    socket.emit('onGroupJoin', { groupId })
    return () => {
      socket.emit('onGroupLeave', { groupId });
    }
  }, [id]);

  const sendTypingStatus = () => {};

  return (
    <ConversationChannelPageStyle>
      <MessagePanel
        sendTypingStatus={sendTypingStatus}
        isRecipientTyping={isRecipientTyping}
      ></MessagePanel>
    </ConversationChannelPageStyle>
  )
}