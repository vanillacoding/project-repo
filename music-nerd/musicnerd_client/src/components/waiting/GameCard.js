import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../lib/colors';

const GameCard = ({
  gameId,
  isPlaying,
  players,
  gameTitle,
  thumbnailUrl,
  enterGame
}) => (
  <GameCardWrapper
    onClick={() => enterGame(gameId)}
    thumbnailUrl={thumbnailUrl}
  >
    <h1>{gameTitle}</h1>
    <GameStatus>
      <h3>{isPlaying ? 'Playing' : 'Available'}</h3>
      <h3>{players.length} players</h3>
    </GameStatus>
  </GameCardWrapper>
);

const GameCardWrapper = styled.div`
  padding: 1rem;
  border: 0.3rem solid ${colors.DEFAULT_GLOBAL_FONT_COLOR};
  height: 100%;
  width: 24rem;
  background: url(${props => props.thumbnailUrl});
  background-size: cover;
  text-align: center;
  color: ${colors.MAIN_TEXT_COLOR};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  cursor: pointer;

  h1 {
    margin-top: 2rem;
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

const GameStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10rem;
`;

GameCard.propTypes = {
  gameId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  players: PropTypes.array.isRequired,
  gameTitle: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  enterGame: PropTypes.func.isRequired,
};

export default GameCard;
