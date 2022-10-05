import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Room as S } from './styles';
import RoomCanvas from '../../components/RoomCanvas';
import RoomVideos from '../../components/RoomVideos';
import GuideModal from '../../components/GuideModal';
import ExitButton from '../../components/ExitButton';
import Chatting from '../../components/Chatting';
import { getUserDataByToken } from '../../reducers/userSlice';

export default function Room() {
  const dispatch = useDispatch();
  const { isVideoConnected, videoChatId } = useSelector(state => state.videoChat);
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUserDataByToken());
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => stream.getTracks().forEach(track => track.stop()))
      .catch(err => console.log(err));
  }, []);

  return (
    <S.Container>
      {isVideoConnected && <RoomVideos roomId={videoChatId} />}
      {user && (
        <>
          <RoomCanvas />
          <GuideModal />
          <ExitButton />
          <Chatting user={user}/>
        </>
      )}
    </S.Container>
  );
}
