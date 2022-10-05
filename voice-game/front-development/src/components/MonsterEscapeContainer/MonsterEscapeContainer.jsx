import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import GameManual from "../GameManual/GameManual";
import MonsterEscape from "../MonsterEscape/MonsterEscape";
import ControlBox from "../../games/monsterEscape/ControlBox";
import Monster from "../../games/monsterEscape/Monster";
import Obstacle from "../../games/monsterEscape/Obstacle";
import PlayInfo from "../../games/monsterEscape/PlayInfo";
import GameMap from "../../games/monsterEscape/GameMap";
import MultiPlayer from "../../games/monsterEscape/MultiPlayer";
import Loading from "../Loading/Loading";

import useLoadedImage from "../../hooks/useLoadedImage";

import gameMap from "../../games/monsterEscape/gameMap.json";
import getMedia from "../../utils/getMedia";
import VolumeMeter from "../../utils/VolumeMeter";
import manualImage from "../../images/manuals/manual_monsterEscape.png";

const FPS = 36;
const ASPECT_RATIO = 9 / 16;
const { innerWidth } = window;
const canvasWidth = 0.8 * innerWidth;
const canvasHeight = ASPECT_RATIO * canvasWidth;

const MonsterEscapeContainer = ({ socket, roomId, player, otherPlayers }) => {
  const [volumeMeter, setVolumeMeter] = useState(null);
  const [isInitGame, setIsInitGame] = useState(false);
  const [gameElement, setGameElement] = useState({});

  const { image, isLoaded } = useLoadedImage("monsterEscape");
  const streamRef = useRef(null);

  useEffect(() => {
    (async () => {
      streamRef.current = await getMedia({ audio: true });
      const volumeMeter = new VolumeMeter(streamRef.current, {
        bufferSize: 4096,
        minDecibels: -60,
        maxDecibels: -30,
        timeConstant: 0.9,
      });

      setVolumeMeter(volumeMeter);
    })();

    return () => {
      streamRef.current.getTracks()[0].stop();
      streamRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    const ceilingMap = new GameMap(
      "ceiling",
      canvasWidth,
      canvasHeight,
      image.obstacles.ceiling
    );
    const groundMap = new GameMap(
      "ground",
      canvasWidth,
      canvasHeight,
      image.obstacles.ground
    );
    const enemyMap = new GameMap(
      "enemy",
      canvasWidth,
      canvasHeight,
      image.obstacles.enemy
    );

    enemyMap.setGameMap(gameMap.enemy);
    groundMap.setGameMap(gameMap.ground);
    ceilingMap.setGameMap(gameMap.ceiling);

    const controlBox = new ControlBox(canvasWidth, canvasHeight, image);
    const playInfo = new PlayInfo(canvasWidth, canvasHeight, image, FPS);
    const ceiling = new Obstacle(ceilingMap.gameMap, canvasWidth);
    const ground = new Obstacle(groundMap.gameMap, canvasWidth);
    const enemy = new Obstacle(enemyMap.gameMap, canvasWidth);
    const myMonster = new Monster(
      canvasWidth,
      canvasHeight,
      image,
      player,
      0.1,
      3,
      FPS
    );
    const yourMonster = new MultiPlayer(
      canvasWidth,
      canvasHeight,
      image,
      0.06,
      FPS
    );

    setIsInitGame(true);

    setGameElement({
      controlBox,
      playInfo,
      ceiling,
      ground,
      enemy,
      myMonster,
      yourMonster,
    });
  }, [isInitGame, isLoaded, image, player, otherPlayers]);

  return (
    <>
      {isLoaded ? (
        <>
          <GameManual imgSrc={manualImage} />
          <MonsterEscape
            isInitGame={isInitGame}
            setIsInitGame={setIsInitGame}
            gameElement={gameElement}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            volumeMeter={volumeMeter}
            socket={socket}
            roomId={roomId}
            otherPlayers={otherPlayers}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

MonsterEscapeContainer.propTypes = {
  socket: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  player: PropTypes.object.isRequired,
  otherPlayers: PropTypes.array.isRequired,
};

export default MonsterEscapeContainer;
