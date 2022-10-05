import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '../layout/Button';

import histroy from '../../lib/history';
import { leaveRoom } from '../../lib/socket';

import * as colors from '../../lib/colors';

const FinalScore = ({
  score,
  userId,
  gameId
}) => {
  const sortedScore = [];
  for (const player in score) {
    sortedScore.push([player, score[player]]);
  }

  sortedScore.sort((a, b) => b[1] - a[1]);

  const onConfirmButtonClick = () => {
    leaveRoom(userId, gameId);
    histroy.push('/waiting');
  };

  return (
    <ScoreWrapper>
      {sortedScore.map(score => (
        <Score key={score[0]}>
          <h1>{score[0]}</h1>
          <h2>{score[1]}</h2>
        </Score>
      ))}
      <Button onClick={onConfirmButtonClick}>Confirm</Button>
    </ScoreWrapper>
  );
};

const ScoreWrapper = styled.div`
  height: 50vh;
  width: 40vw;
  padding: 2rem;

  button {
    transform: translateY(26rem);
  }
`;

const Score = styled.div`
  height: 3rem;
  width: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: 0.2rem 0.2rem 0.2rem ${colors.GAME_HIGHLIGHT_COLOR};

  h1 {
    color: ${colors.GAME_HIGHLIGHT_COLOR};
    font-weight: bold;
    width: 56%;
    margin-right: 2%;
    text-align: right;
  }

  h2 {
    width: 40%;
    margin-left: 2%;
    text-align: left;
  }
`;

FinalScore.propTypes = {
  score: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired
};

export default FinalScore;
