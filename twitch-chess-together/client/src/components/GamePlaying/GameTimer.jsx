import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { nextTurnSequence } from '../../features/chess/slices';
import { selectChessMyTurnSequence } from '../../features/chess/selectors';

import useTimer from '../../common/hooks/useTimer';
import { GAME_TURN_INTERVAL } from '../../common/constants/game';
import { flexCenter } from '../styles/mixin';

export default function GameTimer() {
  const dispatch = useDispatch();
  const myTurnSequence = useSelector(selectChessMyTurnSequence);
  const lefTime = useTimer(GAME_TURN_INTERVAL);

  useEffect(() => {
    if (lefTime === 0) {
      if (myTurnSequence) {
        dispatch(nextTurnSequence());
      }
    }
  }, [lefTime]);

  return (
    <TimerOuterBox>
      <Timer>Left Time: {lefTime}</Timer>
    </TimerOuterBox>
  );
}

const TimerOuterBox = styled.div`
  ${flexCenter}
  height: 100%;
`;

const Timer = styled.div`
  ${flexCenter}
  width: 400px;
  height: 60px;
  font-size: 40px;
  text-align: center;
  border: 3px solid #a7a7a7;
`;
