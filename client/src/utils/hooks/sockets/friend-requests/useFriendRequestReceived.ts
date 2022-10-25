import { useNavigate } from 'react-router-dom';
import { AppDispatch } from './../../../../store/index';
import { useDispatch } from 'react-redux';
import { useToast } from '../../useToast';
import { addFriendRequest } from '../../../../store/friends/friendsSlice';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { FriendRequest } from '../../../types';
import { IoMdPersonAdd } from 'react-icons/io';

export function useFriendRequestReceived() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { info } = useToast({ theme: 'dark' });

  useEffect(() => {
    socket.on('onFriendRequestReceived', (payload: FriendRequest) => {
      console.log('onFriendRequestReceived');
      console.log(payload);
      dispatch(addFriendRequest(payload));
      info(`Incoming Friend Request from ${payload.sender.firstName}`, {
        position: 'bottom-left',
        icon: IoMdPersonAdd,
        onClick: () => navigate('/friends/requests'),
      });
    });
    return () => {
      socket.off('onFriendRequestReceived');
    };
  }, []);
}