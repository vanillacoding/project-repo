import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectUser } from '../features/user/selectors';
import { selectLoadingSequence } from '../features/loading/selectors';
import { initJoinGame } from '../features/game/slices';
import { flexCenter } from '../components/styles/mixin';

export default function GameJoiningPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userProfile = useSelector(selectUser);
  const loadingSequence = useSelector(selectLoadingSequence);

  const [gameId, setGameId] = useState('');

  useEffect(() => {
    if (loadingSequence >= 1) {
      history.push('/game/loading');
    }
  }, [loadingSequence]);

  const handleChange = ({ target: { value } }) => {
    setGameId(value);
  };

  const handleJoinGame = (event) => {
    event.preventDefault();
    dispatch(initJoinGame({ userProfile, gameId }));
  };

  return (
    <GameJoinCodeInputOuterBox>
      참가 코드
      <GameJoinCodeInputBox>
        <GameJoinCodeInput
          type="password"
          value={gameId}
          onChange={handleChange}
        />
        <GameJoinCodeSubmitButtonOuterBox>
          <GameJoinCodeSubmitButton type="submit" onClick={handleJoinGame}>
            참가
          </GameJoinCodeSubmitButton>
        </GameJoinCodeSubmitButtonOuterBox>
      </GameJoinCodeInputBox>
    </GameJoinCodeInputOuterBox>
  );
}

const GameJoinCodeInputOuterBox = styled.div`
  ${flexCenter}
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-size: 40px;
`;

const GameJoinCodeInputBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const GameJoinCodeSubmitButtonOuterBox = styled.div`
  margin-left: 30px;
  border: none;
`;

const GameJoinCodeInput = styled.input`
  height: 40px;
  width: 200px;
  border: 3px solid white;
  font-size: 30px;
`;

const GameJoinCodeSubmitButton = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 45px;
  border: 0 sold black;
  font-size: 20px;
  text-align: center;
`;
