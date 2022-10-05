import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { cancelGameServer } from '../features/gameServer/slices';
import {
  cancelChatServer,
  notifyGameWinner,
} from '../features/chatServer/slices';
import {
  initializePiecePosition,
  initializeTurnSequence,
} from '../features/chess/slices';
import { initializeSequence } from '../features/loading/slices';

import { selectGameWinnerInfo } from '../features/game/selectors';
import { initializeGameState } from '../features/game/slices';

import PlayerProfileImage from '../components/GamePlaying/PlayerProfileImage';
import PlayerProfileDisplayName from '../components/GamePlaying/PlayerProfileDisplayName';
import Button from '../components/common/Button';
import { flexCenter } from '../components/styles/mixin';

export default function GameResultPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const winnerProfile = useSelector(selectGameWinnerInfo);

  const handleClick = () => {
    dispatch(initializeGameState());
    history.push('/menu');
  };

  useEffect(() => {
    if (winnerProfile === null) {
      history.push('/menu');
    }

    dispatch(initializePiecePosition());
    dispatch(initializeTurnSequence());
    dispatch(notifyGameWinner());
    dispatch(initializeSequence());
    dispatch(cancelGameServer());
    dispatch(cancelChatServer());
  }, []);

  return (
    <>
      <GameResultText>게임 결과</GameResultText>
      <WinnerProfile>
        승자
        <PlayerProfileImage imgUrl={winnerProfile.profileImageUrl} size={300} />
        <PlayerProfileDisplayName
          displayName={winnerProfile.displayName}
          size={50}
        />
      </WinnerProfile>
      <ButtonOuterBox>
        <Button handleClick={handleClick}>
          <ExitToMenuText>메뉴로 나가기</ExitToMenuText>
        </Button>
      </ButtonOuterBox>
    </>
  );
}

const WinnerProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 400px;
  margin-top: 50px;
  font-size: 30px;
`;

const GameResultText = styled.div`
  padding-top: 200px;
  text-align: center;
  font-size: 60px;
`;

const ExitToMenuText = styled.div`
  font-size: 30px;
`;

const ButtonOuterBox = styled.div`
  padding-top: 100px;
  ${flexCenter}
`;
