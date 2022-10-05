import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

import Canvas from "../shared/Canvas/Canvas";
import getIsCanvasButtonClicked from "../../utils/getIsCanvasButtonClicked";
import background from "../../images/monsterEscape/backgrounds/background.png";

const FPS = 36;
const GOAL_DISTANCE = 3;
const TIME_LEFT_TO_RIGHT = 10;
const TIME_TOP_TO_BOTTOM = 5;
const SPEED_STEP = 0.5;
const VOLUME_STEP = 0.5;

const MonsterEscape = ({
  isInitGame,
  setIsInitGame,
  gameElement,
  canvasWidth,
  canvasHeight,
  volumeMeter,
  socket,
  roomId,
  otherPlayers,
}) => {
  const grndSpd = canvasWidth / (FPS * TIME_LEFT_TO_RIGHT);
  const verticalSpd = canvasHeight / (FPS * TIME_TOP_TO_BOTTOM);

  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const myDataRef = useRef(null);
  const yourDataRef = useRef(null);
  const thenTimeRef = useRef(0);
  const singleFrameRef = useRef(0);
  const doubleFrameRef = useRef(0);

  const [isPlay, setIsPlay] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volThreshold, setVolThreshold] = useState(3);

  const handleControlBox = useCallback(
    (ev) => {
      const controlBox = gameElement.controlBox;

      const {
        playBtnPosX,
        playBtnPosY,
        playBtnWidth,
        playBtnHeight,
      } = controlBox;
      const { upBtnPosX, upBtnPosY, upBtnWidth, upBtnHeight } = controlBox;
      const {
        downBtnPosX,
        downBtnPosY,
        downBtnWidth,
        downBtnHeight,
      } = controlBox;
      const {
        plusBtnPosX,
        plusBtnPosY,
        plusBtnWidth,
        plusBtnHeight,
      } = controlBox;
      const {
        minusBtnPosX,
        minusBtnPosY,
        minusBtnWidth,
        minusBtnHeight,
      } = controlBox;

      const clickedPosX = ev.nativeEvent.offsetX;
      const clickedPosY = ev.nativeEvent.offsetY;

      const clickedInfo = [clickedPosX, clickedPosY];
      const playBtnInfo = [
        playBtnPosX,
        playBtnPosY,
        playBtnWidth,
        playBtnHeight,
      ];
      const upBtnInfo = [upBtnPosX, upBtnPosY, upBtnWidth, upBtnHeight];
      const downBtnInfo = [
        downBtnPosX,
        downBtnPosY,
        downBtnWidth,
        downBtnHeight,
      ];
      const plusBtnInfo = [
        plusBtnPosX,
        plusBtnPosY,
        plusBtnWidth,
        plusBtnHeight,
      ];
      const minusBtnInfo = [
        minusBtnPosX,
        minusBtnPosY,
        minusBtnWidth,
        minusBtnHeight,
      ];

      const isPlayBtnClicked = getIsCanvasButtonClicked(
        clickedInfo,
        playBtnInfo
      );
      const isUpBtnClicked = getIsCanvasButtonClicked(clickedInfo, upBtnInfo);
      const isDownBtnClicked = getIsCanvasButtonClicked(
        clickedInfo,
        downBtnInfo
      );
      const isPlusBtnClicked = getIsCanvasButtonClicked(
        clickedInfo,
        plusBtnInfo
      );
      const isMinusBtnClicked = getIsCanvasButtonClicked(
        clickedInfo,
        minusBtnInfo
      );

      if (isPlayBtnClicked) {
        if (isPlay && isFinished) {
          myDataRef.current.normDistance = 0;
          socket.emit("monsterescape-restart", roomId);
        } else if (isPlay && !isFinished) {
          setIsInitGame(false);
        } else {
          socket.emit("monsterescape-start", roomId);
        }
      }

      if (isUpBtnClicked) {
        setSpeed(speed + SPEED_STEP);
      } else if (isDownBtnClicked) {
        setSpeed(Math.max(SPEED_STEP, speed - SPEED_STEP));
      }

      if (isPlusBtnClicked) {
        setVolThreshold(volThreshold + VOLUME_STEP);
      } else if (isMinusBtnClicked) {
        setVolThreshold(Math.max(VOLUME_STEP, volThreshold - VOLUME_STEP));
      }
    },
    [
      isPlay,
      speed,
      roomId,
      socket,
      setIsInitGame,
      volThreshold,
      gameElement.controlBox,
      isFinished,
    ]
  );

  const socketOn = useCallback(() => {
    socket.on("monsterescape-play", (yourData) => {
      yourDataRef.current = yourData;
    });

    socket.on("monsterescape-start", () => {
      setIsPlay(true);
    });

    socket.on("monsterescape-restart", () => {
      setIsInitGame(false);
      setIsPlay(false);
      setIsFinished(false);
    });

    socket.on("monsterescape-finish", () => {
      setIsFinished(true);
    });
    return () => {
      socket.off("monsterescape-play");
      socket.off("monsterescape-start");
      socket.off("monsterescape-finish");
    };
  }, [socket, setIsFinished, setIsPlay, setIsInitGame]);

  const drawCanvas = useCallback(() => {
    if (!isInitGame || !volumeMeter) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    const draw = (timeStamp) => {
      const timeStep = 1000 / FPS;
      const {
        controlBox,
        playInfo,
        ceiling,
        ground,
        enemy,
        myMonster,
        yourMonster,
      } = gameElement;

      if (!thenTimeRef.current) {
        thenTimeRef.current = timeStamp;
      }

      if (timeStamp - thenTimeRef.current <= timeStep) {
        return (animationIdRef.current = requestAnimationFrame(draw));
      }

      thenTimeRef.current = timeStamp;
      singleFrameRef.current = (singleFrameRef.current + 1) % FPS;
      doubleFrameRef.current = (doubleFrameRef.current + 1) % (2 * FPS);

      const volumeData = {
        volume: volumeMeter.getVolume(),
        volThreshold: volThreshold,
      };

      const gameStatus = {
        isPlay: isPlay,
        isFinished: isFinished,
        goalDistance: GOAL_DISTANCE,
      };

      myMonster.setIsCollision([enemy], FPS, "easy");
      if (!myMonster.life) {
        setIsInitGame(false);
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ground.animate(ctx, speed * grndSpd);
      ceiling.animate(ctx, 0.5 * speed * grndSpd);

      if (isPlay && !isFinished) {
        const monsterSpd = { spdX: speed * grndSpd, spdY: speed * verticalSpd };
        enemy.animate(ctx, 2 * speed * grndSpd);

        myMonster.animate(ctx, monsterSpd, volumeData, singleFrameRef.current);

        myDataRef.current = {
          normPosX: myMonster.posX / canvasWidth,
          normPosY: myMonster.posY / canvasHeight,
          normDistance: myMonster.distance / canvasWidth,
          shieldTime: myMonster.shieldTime,
          life: myMonster.life,
        };

        socket.emit("monsterescape-play", roomId, myDataRef?.current);

        if (yourDataRef.current && otherPlayers.length !== 0) {
          yourMonster.animate(
            ctx,
            myDataRef.current,
            yourDataRef.current,
            otherPlayers[0],
            singleFrameRef.current
          );
        }

        if (myDataRef.current.normDistance >= GOAL_DISTANCE) {
          myMonster.isWinner = true;
          socket.emit("monsterescape-finish", roomId);
        }
      } else {
        const monsterSpd = { spdX: 0, spdY: 0 };
        myMonster.animate(ctx, monsterSpd, volumeData, singleFrameRef.current);

        if (otherPlayers.length !== 0) {
          yourMonster.animate(
            ctx,
            0,
            0,
            otherPlayers[0],
            singleFrameRef.current
          );
        }
      }

      controlBox.animate(ctx, isPlay, speed, volumeData);
      playInfo.animate(ctx, myMonster, gameStatus, singleFrameRef.current);

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationIdRef.current);
  }, [
    isPlay,
    speed,
    grndSpd,
    verticalSpd,
    volThreshold,
    isInitGame,
    gameElement,
    canvasWidth,
    canvasHeight,
    volumeMeter,
    socket,
    roomId,
    isFinished,
    setIsInitGame,
    otherPlayers,
  ]);

  useEffect(socketOn, [socketOn]);
  useEffect(drawCanvas, [drawCanvas]);

  return (
    <Canvas
      ref={canvasRef}
      onClick={handleControlBox}
      width={canvasWidth}
      height={canvasHeight}
      margin={["5vh", "auto", "0", "auto"]}
      bgImage={background}
    />
  );
};

MonsterEscape.propTypes = {
  isInitGame: PropTypes.bool.isRequired,
  setIsInitGame: PropTypes.func.isRequired,
  gameElement: PropTypes.object.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  volumeMeter: PropTypes.object,
  socket: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  otherPlayers: PropTypes.array.isRequired,
};

export default MonsterEscape;
