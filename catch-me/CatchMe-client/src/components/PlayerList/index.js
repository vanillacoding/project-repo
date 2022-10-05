import React from "react";
import styled from "styled-components";

import PlayerCard from "../PlayerCard";

const PlayerList = ({ players }) => {
  return (
    <PlayerCardList>
      {Object.values(players).map((player, index) => (
        <PlayerCard
          key={index}
          name={player.username}
          isReady={player.isReady}
          role={player.role}
        />
      ))}
    </PlayerCardList>
  );
};

const PlayerCardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
`;

export default PlayerList;
