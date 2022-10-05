import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';

import {
  selectCurrentGamePlayer,
  selectGameWinner,
} from '../../features/game/selectors';
import { selectUserId } from '../../features/user/selectors';
import { nextTurnSequence } from '../../features/chess/slices';
import { notifyGameInfo } from '../../features/chatServer/slices';

import PlayerProfileImage from './PlayerProfileImage';
import PlayerProfileDisplayName from './PlayerProfileDisplayName';

export default function CurrentTurnInfo() {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentGamePlayer);
  const winner = useSelector(selectGameWinner);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const currentPlayerId = currentPlayer.id;
    if (winner !== null) return;
    if (userId === currentPlayerId) {
      dispatch(nextTurnSequence());
      dispatch(notifyGameInfo('현재 자신의 차례입니다.'));
    } else {
      dispatch(notifyGameInfo('현재 자신의 차례가 아닙니다.'));
    }
  }, [currentPlayer.id]);

  return (
    <CurrentTurnInfoInnerBox>
      현재 차례
      <PlayerProfileImage imgUrl={currentPlayer.profileImageUrl} size={200} />
      <PlayerProfileDisplayName
        displayName={currentPlayer.displayName}
        size={43}
      />
    </CurrentTurnInfoInnerBox>
  );
}

const CurrentTurnInfoInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 300px;
  margin-top: 50px;
  font-size: 30px;
`;
