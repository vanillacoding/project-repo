/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import EnergyBattle from "../EnergyBattle/EnergyBattle";
import EnergyBattleController from "../EnergyBattleController/EnergyBattleController";
import PlayerCard from "../PlayerCard/PlayerCard";
import GameManual from "../GameManual/GameManual";
import Loading from "../Loading/Loading";

import useLoadedImage from "../../hooks/useLoadedImage";
import usePlayEnergyBattle from "../../hooks/usePlayEnergyBattle";

import manualImage from "../../images/manuals/manual_energyBattle.png";
import makeResource from "../../games/energyBattle/makeResouce";
import { ROOM_STATUS } from "../../constants/constants";

const GameTitle = styled.h1`
  margin-top: 2vh;
  margin-bottom: 2vh;
  width: 100%;
  font-size: 3rem;
  text-align: center;
`;

const RoomNumber = styled.h3`
  margin-top: 1vh;
`;

const OperationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 5vh;
  margin: 4vh auto;
`;

const PlayerCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  width: 14vw;
  min-width: 180px;
  height: 8vh;
`;

const EnergyBattleContainer = ({
  socket,
  roomId,
  roomNumber,
  player,
  otherPlayers,
}) => {
  const [roomStatus, setRoomStatus] = useState("");
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [isOtherModalClosed, setIsOtherModalClosed] = useState(false);

  const gameResource = useRef(null);
  const canvasWidth = useRef(document.body.clientWidth * 0.8);
  const canvasHeight = useRef(document.body.clientWidth * 0.38);

  const [volumeMeter, counter, playGame] = usePlayEnergyBattle(
    setRoomStatus,
    setIsStartDisabled
  );
  const { image, isLoaded } = useLoadedImage("energyBattle");

  const startGame = useCallback(async () => {
    if (isStartDisabled) {
      return;
    }

    if (roomStatus === ROOM_STATUS.READY || roomStatus === ROOM_STATUS.END) {
      socket.emit("start-game");
      playGame();
    }
  }, [isStartDisabled, playGame, roomStatus, socket]);

  const closeModal = useCallback(() => {
    socket.emit("close-modal");
    setIsModalClosed(true);
  }, []);

  useEffect(() => {
    canvasWidth.current = document.body.clientWidth * 0.8;
    canvasHeight.current = document.body.clientWidth * 0.38;
    socket.on("start-game", playGame);
    socket.on("close-other-modal", () => {
      setIsOtherModalClosed(true);
    });

    if (isLoaded) {
      gameResource.current = makeResource(
        image,
        canvasWidth.current,
        canvasHeight.current
      );
    }

    if (!otherPlayers || (otherPlayers && otherPlayers.length === 0)) {
      setIsOtherModalClosed(false);
      setRoomStatus(ROOM_STATUS.WAITING);
    }

    if (otherPlayers && otherPlayers.length > 0 && isModalClosed) {
      socket.emit("close-modal");
    }

    if (isModalClosed && isOtherModalClosed) {
      setRoomStatus(ROOM_STATUS.READY);
    }

    return () => {
      socket.off("start-game");
      socket.off("close-other-modal");
    };
  }, [socket, otherPlayers, playGame, isModalClosed, isOtherModalClosed]);

  return (
    <>
      {isLoaded ? (
        <>
          <GameTitle>ENERGY BATTLE</GameTitle>
          <GameManual imgSrc={manualImage} onClick={closeModal} />
          <RoomNumber>Room Number {roomNumber}</RoomNumber>
          <OperationContainer>
            <PlayerCardContainer>
              <PlayerCard player={player} />
            </PlayerCardContainer>
            <EnergyBattleController
              counter={counter}
              roomStatus={roomStatus}
              onClick={startGame}
            />
            <PlayerCardContainer>
              {otherPlayers && otherPlayers.length !== 0 ? (
                <PlayerCard player={otherPlayers[0]} />
              ) : (
                <PlayerCard />
              )}
            </PlayerCardContainer>
          </OperationContainer>
          <EnergyBattle
            socket={socket}
            volumeMeter={volumeMeter}
            roomStatus={roomStatus}
            roomId={roomId}
            player={player}
            otherPlayer={otherPlayers && otherPlayers[0]}
            canvasWidth={canvasWidth.current}
            canvasHeight={canvasHeight.current}
            gameResource={gameResource.current}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

EnergyBattleContainer.propTypes = {
  socket: PropTypes.object.isRequired,
  roomId: PropTypes.string,
  roomNumber: PropTypes.number.isRequired,
  player: PropTypes.object.isRequired,
  otherPlayers: PropTypes.array,
};

export default EnergyBattleContainer;
