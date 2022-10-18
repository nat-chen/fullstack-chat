import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../../components/sidebars/ConversationSidebar';
import { AppDispatch } from '../../store';
import { addGroupMessage } from '../../store/groupMessageSlice';
import { addGroup, fetchGroupsThunk } from '../../store/groupSlice';
import { updateType } from '../../store/selectedSlice';
import { socket } from '../../utils/context/SocketContext';
import { AddGroupUserMessagePayload, GroupMessageEventPayload } from '../../utils/types';

export const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateType('group'));
    dispatch(fetchGroupsThunk());
  }, []);

  useEffect(() => {
    socket.on('onGroupMessage', (payload: GroupMessageEventPayload) => {
      console.log('Group Message Received');
      const { group, message } = payload;
      console.log(group, message);
      dispatch(addGroupMessage(payload));
    });

    socket.on('onGroupCreate', (payload, Group) => {
      console.log('Group Created...');
      dispatch(addGroup(payload));
    });

    socket.on('onGroupUserAdd', (payload: AddGroupUserMessagePayload) => {
      console.log('onGroupUserAdd');
      console.log(payload);
      dispatch(addGroup(payload.group));
    })

    return () => {
      socket.off('onGroupMessage');
      socket.off('onGroupCreate');
      socket.off('onGroupUserAdd');
    }
  })

  return (
    <>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </>
  )
}