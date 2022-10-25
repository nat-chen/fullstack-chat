import { WebsocketEvents } from './../../../constants';
import { AppDispatch, RootState } from './../../../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from './../../../context/SocketContext';
import { useContext, useEffect } from 'react';
import { resetState } from '../../../../store/call/callSlice';

export function useVoiceCallHangUp() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const { call, connection, localStream, remoteStream } = useSelector(
    (state: RootState) => state.call
  );
  useEffect(() => {
    socket.on(WebsocketEvents.VOICE_CALL_HANG_UP, () => {
      console.log('received onVoiceCallHangUp');
      localStream &&
        localStream.getTracks().forEach((track) => {
          console.log(localStream.id);
          console.log('stopping local track: ', track);
          track.stop();
        });
      remoteStream &&
        remoteStream.getTracks().forEach((track) => {
          console.log(remoteStream.id);
          console.log('stopping remote track', track);
          track.stop();
        });
      call && call.close();
      connection && connection.close();
      dispatch(resetState());
    });
    return () => {
      socket.off(WebsocketEvents.VOICE_CALL_HANG_UP);
    }
  }, [call, remoteStream, localStream]);
}