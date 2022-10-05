import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../lib/colors';

const PlayerCard = ({
  userId,
  username,
  score,
  isReady,
  hasScored
}) => (
  <CardWrapper
    data-id={userId}
    isReady={isReady}
    hasScored={hasScored}
  >
    <h1>{username.toUpperCase()}</h1>
    <h4>{score} points</h4>
  </CardWrapper>
);

const CardWrapper = styled.div`
  margin: 0 1.25rem;
  padding: 0.5rem;
  height: 8rem;
  width: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  color: ${colors.GAME_PLAYER_COLOR};

  h1 {
    font-size: 2.2rem;
    text-shadow: ${props => props.isReady &&
      `0 0 6px rgba(212, 202, 228, 0.92),
      0 0 30px rgba(212, 202, 228, 0.34),
      0 0 12px rgba(154, 30, 242, 0.52),
      0 0 21px rgba(154, 30, 242, 0.92),
      0 0 34px rgba(154, 30, 242, 0.78),
      0 0 54px rgba(154, 30, 242, 0.92)`
    };
  }

  h4 {
    font-size: 1.3rem;
    animation: ${props => props.hasScored && scoreNeon} 0.5s ease-in-out infinite;
  }
`;

const scoreNeon = keyframes`
  from {
    text-shadow:
    0 0 6px rgba(228, 202, 202, 0.92),
    0 0 30px rgba(228, 202, 202, 0.34),
    0 0 12px rgba(242, 58, 30, 0.52),
    0 0 21px rgba(242, 58, 30, 0.92),
    0 0 34px rgba(242, 58, 30, 0.78),
    0 0 54px rgba(242, 58, 30, 0.92);
  }
  to {
    text-shadow:
    0 0 6px rgba(228, 202, 202, 0.98),
    0 0 30px rgba(228, 202, 202, 0.42),
    0 0 12px rgba(242, 58, 30, 0.58),
    0 0 22px rgba(242, 58, 30, 0.84),
    0 0 38px rgba(242, 58, 30, 0.88),
    0 0 60px rgba(242, 58, 30, 1),
  }
`;

PlayerCard.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  isReady: PropTypes.bool,
  hasScored: PropTypes.bool.isRequired
};

export default PlayerCard;
