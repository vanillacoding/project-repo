import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

import useErrorMessage from "../../hooks/useErrorMessage";

const GameRoomCardContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 400;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  cursor: pointer;
`;

const GameRoomData = styled.div`
  flex-basis: 80%;
  color: black;
  text-align: left;
  line-height: 1.2rem;
`;

const GameRoomStatus = styled.div`
  display: flex;
  align-items: flex-end;
  flex-basis: 20%;
  font-size: 1.5rem;
  color: ${(props) => props.color || "black"};
  bottom: 10%;
  right: 10%;
`;

const GameRoomCard = ({
  room: { players, createdAt, status, roomNumber },
  onClick,
  gameTitle,
}) => {
  const [error, showErrorMessage] = useErrorMessage("");
  const handleClickRoomCard = () => {
    if (status === "Enter") {
      return onClick();
    }

    showErrorMessage("입장이 불가능합니다.");
  };

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <GameRoomCardContainer onClick={handleClickRoomCard}>
        <GameRoomData>
          {gameTitle} &nbsp;
          {roomNumber ? roomNumber : Math.floor(Math.random() * 1000)}
          <br />
          Players: {players.length}
          <br />
          {createdAt.slice(0, 16)}
        </GameRoomData>
        {status === "Full" ? (
          <GameRoomStatus color="#e74c3c">{status}</GameRoomStatus>
        ) : (
          <GameRoomStatus color="#0984e3">{status}</GameRoomStatus>
        )}
      </GameRoomCardContainer>
    </>
  );
};

GameRoomCard.propTypes = {
  room: PropTypes.shape({
    players: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    roomNumber: PropTypes.number,
  }),
  onClick: PropTypes.func.isRequired,
  gameTitle: PropTypes.string.isRequired,
};

export default GameRoomCard;
