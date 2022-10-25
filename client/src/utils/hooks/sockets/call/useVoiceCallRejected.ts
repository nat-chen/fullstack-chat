import { AppDispatch } from './../../../../store/index';
import { useDispatch } from 'react-redux';
import { SocketContext } from './../../../context/SocketContext';
import { useContext, useEffect } from 'react';
import { WebsocketEvents } from '../../../constants';
import { resetState } from '../../../../store/call/callSlice';

export function useVoiceCallRejected() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on(WebsocketEvents.VIDEO_CALL_REJECTED, (data) => {
      console.log('receiver rejected the voice call ', data.receiver);
      dispatch(resetState());
    });
    return () => {
      socket.off(WebsocketEvents.VOICE_CALL_REJECTED);
    }
  }, [])
}