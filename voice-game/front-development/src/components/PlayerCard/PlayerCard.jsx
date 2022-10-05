import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PlayerData = styled.span`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  display: block;
  color: black;
`;

const PlayerCard = ({ player }) => {
  return (
    <PlayerData>
      {player ? player.name : "Waiting..."}
      <br />
      {player ? player.gameRecords.energyBattle : "😝"}승
    </PlayerData>
  );
};

PlayerCard.propTypes = {
  player: PropTypes.object,
};

export default PlayerCard;
