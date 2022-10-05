import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectGamePlayers } from '../../features/game/selectors';
import PlayerProfileImage from './PlayerProfileImage';
import PlayerProfileDisplayName from './PlayerProfileDisplayName';

export default function PlayersInfo() {
  const [player1, player2] = useSelector(selectGamePlayers);

  return (
    <PlayerInfoInnerBox>
      <PlayerProfile>
        <PlayerProfileImage imgUrl={player1.profileImageUrl} size={80} />
        <PlayerProfileDisplayName displayName={player1.displayName} />
      </PlayerProfile>
      <VersusText>VS</VersusText>
      <PlayerProfile>
        <PlayerProfileImage imgUrl={player2.profileImageUrl} size={80} />
        <PlayerProfileDisplayName displayName={player2.displayName} />
      </PlayerProfile>
    </PlayerInfoInnerBox>
  );
}

const PlayerProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 150px;
  height: 130px;
`;

const VersusText = styled.div`
  font-size: 20px;
`;

const PlayerInfoInnerBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 350px;
  height: 150px;
`;
