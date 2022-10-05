import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { initChatServer } from '../features/chatServer/slices';
import { initGameServer } from '../features/gameServer/slices';
import { selectLoadingSequence } from '../features/loading/selectors';
import { initCreateGame, initStartGame } from '../features/game/slices';
import { selectGame } from '../features/game/selectors';
import { flexCenter } from '../components/styles/mixin';

const CREATING_GAME_DATA = 0;
const CONNECTING_TO_TWITCH_CHAT_SERVER = 1;
const CONNECTING_TO_GAME_SERVER = 2;
const WAITING_FOR_OTHER_PLAYER = 3;
const LOAD_OTHER_PLAYER_INFORMATION = 4;
const LOADING_IS_DONE = 5;

export default function GameLoadingPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const gameInfo = useSelector(selectGame);
  const loadingSequence = useSelector(selectLoadingSequence);

  useEffect(async () => {
    switch (loadingSequence) {
      case CREATING_GAME_DATA: {
        dispatch(initCreateGame());
        break;
      }
      case CONNECTING_TO_TWITCH_CHAT_SERVER: {
        dispatch(initChatServer());
        break;
      }
      case CONNECTING_TO_GAME_SERVER: {
        dispatch(initGameServer());
        break;
      }
      case WAITING_FOR_OTHER_PLAYER: {
        break;
      }
      case LOAD_OTHER_PLAYER_INFORMATION: {
        dispatch(initStartGame());
        break;
      }
      case LOADING_IS_DONE: {
        history.push('/game/playing');
        break;
      }
      default: {
        history.push('/error');
      }
    }
  }, [loadingSequence]);

  return (
    <LoadingTextWrapper>
      {loadingSequence === CREATING_GAME_DATA && (
        <LoadingText>게임 데이터 생성중 ...</LoadingText>
      )}
      {loadingSequence === CONNECTING_TO_TWITCH_CHAT_SERVER && (
        <LoadingText>트위치 채팅 접속중 ...</LoadingText>
      )}
      {loadingSequence === CONNECTING_TO_GAME_SERVER && (
        <LoadingText>게임 서버에 접속중 ...</LoadingText>
      )}
      {loadingSequence === WAITING_FOR_OTHER_PLAYER && (
        <>
          <LoadingText>상대방 플래이어 기다리는 중...</LoadingText>
          <LoadingText>Code: {gameInfo.gameId}</LoadingText>
        </>
      )}
    </LoadingTextWrapper>
  );
}

const LoadingTextWrapper = styled.div`
  height: 100%;
  width: 100%;
  ${flexCenter}
  flex-direction: column;
`;

const LoadingText = styled.div`
  font-size: 30px;
`;
