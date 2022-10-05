import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { uid } from 'uid';
import styled from 'styled-components';

import { createGame } from '../features/game/slices';
import { selectUser } from '../features/user/selectors';
import { setGameServerRoomId } from '../features/gameServer/slices';
import RadioButton from '../components/common/RadioButton';
import { flexCenter } from '../components/styles/mixin';

const PLAYER1 = 0;
const PLAYER2 = 1;

export default function GameMakingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userProfile = useSelector(selectUser);

  const [gameInfo, setGameInfo] = useState({
    gameId: uid(),
    status: 'initialized',
    firstTurn: null,
    players: [userProfile],
  });

  const submitGameInfo = async (event) => {
    event.preventDefault();
    const { firstTurn } = gameInfo;
    if (firstTurn === null) return;

    dispatch(createGame(gameInfo));
    dispatch(setGameServerRoomId(gameInfo.gameId));
    history.push('/game/loading');
  };

  return (
    <GameMakingFormOuterBox>
      <GameMakingForm>
        <GameMakingText>선공 후공 선택</GameMakingText>
        <RadioButtonOuterBox>
          <RadioButton
            htmlFor="firstTurn"
            text="선공"
            state={gameInfo}
            value={PLAYER1}
            setState={setGameInfo}
          />
          <RadioButton
            htmlFor="firstTurn"
            text="후공"
            state={gameInfo}
            value={PLAYER2}
            setState={setGameInfo}
          />
        </RadioButtonOuterBox>
        <GameMakingFormSubmitButton type="submit" onClick={submitGameInfo}>
          만들기
        </GameMakingFormSubmitButton>
      </GameMakingForm>
    </GameMakingFormOuterBox>
  );
}

const RadioButtonOuterBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 60px;
`;

const GameMakingText = styled.div`
  font-size: 50px;
`;

const GameMakingForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 500px;
`;

const GameMakingFormSubmitButton = styled.button`
  width: 180px;
  height: 60px;
  margin-top: 100px;
  background-color: transparent;
  border: 3px solid white;
  color: white;
  font-size: 40px;
`;

const GameMakingFormOuterBox = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100%;
`;
