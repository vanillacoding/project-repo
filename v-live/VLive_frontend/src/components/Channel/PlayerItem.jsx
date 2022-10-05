import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export default function PlayerItem({ player: { user, character } }) {
  return (
    <PlayerInfo key={user?._id}>
      <div className="player-name">{user?.name}</div>
      <div className="character-name">{character?.name}</div>
    </PlayerInfo>
  );
}

PlayerItem.propTypes = {
  player: PropTypes.shape({
    user: PropTypes.object.isRequired,
    character: PropTypes.object,
  }),
};

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
  margin-top: 10px;
  text-align: center;

  .character-name {
    width: 80px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.pink};
    color: ${({ theme }) => theme.white};
  }
`;
