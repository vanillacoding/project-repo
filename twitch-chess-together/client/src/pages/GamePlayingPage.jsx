import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { initChatServer } from '../features/chatServer/slices';
import { selectChatServerStatus } from '../features/chatServer/selectors';

import ChessGame from '../components/Chess/Game';
import GameDataArea from '../components/GamePlaying/GameDataArea';
import PageLayout from '../components/GamePlaying/PageLayout';
import { initGameServer } from '../features/gameServer/slices';
import { selectGameServerStatus } from '../features/gameServer/selectors';
import { selectGameWinner } from '../features/game/selectors';

export default function GamePlayingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const chatServerStatus = useSelector(selectChatServerStatus);
  const gameServerStatus = useSelector(selectGameServerStatus);
  const gameWinner = useSelector(selectGameWinner);

  useEffect(() => {
    if (!chatServerStatus) {
      dispatch(initChatServer());
    }
    if (!gameServerStatus) {
      dispatch(initGameServer());
    }
  }, []);

  useEffect(() => {
    if (gameWinner === null) return;
    history.push('/game/result');
  }, [gameWinner]);

  return (
    <PageLayout>
      <ChessGame />
      <GameDataArea />
    </PageLayout>
  );
}
