import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import GameOption from "../GameOption/GameOption";
import GameRoomCard from "../GameRoomCard/GameRoomCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../shared/Button/Button";

import useErrorMessage from "../../hooks/useErrorMessage";
import useEnterRandom from "../../hooks/useEnterRandom";
import useFetchRooms from "../../hooks/useFetchRoom";
import useCreateRoom from "../../hooks/useCreateRoom";
import useImageLoad from "../../hooks/useImageLoad";

const GameTitle = styled.h1`
  margin: 0;
  margin-bottom: 2vh;
  width: 100%;
  font-size: 3rem;
  text-align: center;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const GameRoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2vh;
  row-gap: 2vw;
  margin-top: 30px;
  padding: 30px;
`;

const GameRoomList = () => {
  const history = useHistory();
  const location = useLocation();
  const gameTitle = location.pathname.split("/")[2];

  const player = useSelector((state) => state.authReducer.playerData);
  const roomList = useSelector((state) => state.roomReducer[gameTitle]);

  const [error, showErrorMessage] = useErrorMessage("");
  const enterRandom = useEnterRandom(gameTitle, showErrorMessage);
  const createRoom = useCreateRoom(gameTitle, player);

  useFetchRooms(gameTitle, showErrorMessage);
  useImageLoad(gameTitle);

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <GameOption />
      <GameTitle>{gameTitle}</GameTitle>
      <ButtonContainer>
        <Button
          onClick={createRoom}
          margin={["0", "10px", "0", "0"]}
          bgColor={"#1e90ff"}
        >
          New Room
        </Button>
        <Button
          onClick={enterRandom}
          margin={["0", "0", "0", "10px"]}
          bgColor={"#27ae60"}
        >
          Enter Random
        </Button>
      </ButtonContainer>
      <GameRoomGrid>
        {roomList &&
          roomList.map((room) => {
            return (
              <GameRoomCard
                key={room.roomId}
                onClick={() =>
                  history.push(`${location.pathname}/${room.roomId}`)
                }
                room={room}
                gameTitle={gameTitle}
              />
            );
          })}
      </GameRoomGrid>
    </>
  );
};
export default GameRoomList;
