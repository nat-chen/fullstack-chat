import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../../components/sidebars/ConversationSidebar';
import { AppDispatch } from '../../store';
import { addGroupMessage } from '../../store/groupMessageSlice';
import { addGroup, fetchGroupsThunk, removeGroup, updateGroup } from '../../store/groupSlice';
import { updateType } from '../../store/selectedSlice';
import { AuthContext } from '../../utils/context/AuthContext';
import { socket, SocketContext } from '../../utils/context/SocketContext';
import { AddGroupUserMessagePayload, Group, GroupMessageEventPayload, RemoveGroupUserMessagePayload } from '../../utils/types';

export const GroupPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

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
    });

    socket.on('onGroupReceivedNewUser', (payload: AddGroupUserMessagePayload) => {
      console.log('Received onGroupReceivedNewUser');
      dispatch(updateGroup(payload.group));
    });

    socket.on(
      'onGroupRecipientRemoved',
      (payload: RemoveGroupUserMessagePayload) => {
        console.log('onGroupRecipientRemoved');
        console.log(payload);
        dispatch(updateGroup(payload.group));
      }
    );

    socket.on('onGroupRemoved', (payload: RemoveGroupUserMessagePayload) => {
      console.log('onGroupRemoved');
      console.log('user is logged in was removed from the group');
      console.log('navigating...');
      console.log('id', id);
      dispatch(removeGroup(payload.group));
      if (id && parseInt(id) === payload.group.id) {
        console.log('Navigating User to /groups');
        navigate('/groups');
      }
    });

    socket.on('onGroupOwnerUpdate', (payload: Group) => {
      console.log('received onGroupOwnerUpdate');
      dispatch(updateGroup(payload));
    });

    return () => {
      socket.removeAllListeners();
      // socket.off('onGroupMessage');
      // socket.off('onGroupCreate');
      // socket.off('onGroupUserAdd');
      // socket.off('onGroupReceivedNewUser');
      // socket.off('onGroupRemoveUser');
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