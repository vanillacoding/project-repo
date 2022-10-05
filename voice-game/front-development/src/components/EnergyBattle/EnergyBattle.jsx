/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Canvas from "../shared/Canvas/Canvas";
import pickRandom from "../../utils/pickRandom";
import backgroundImages from "../../games/images/energyBattle/backgroundImages";

import { ROOM_STATUS } from "../../constants/constants";
import { gameResultAction } from "../../actions/gameActionCreators";

let randomBackground = pickRandom(backgroundImages);

const EnergyBattle = ({
  socket,
  volumeMeter,
  roomId,
  player,
  roomStatus,
  canvasWidth,
  canvasHeight,
  gameResource,
}) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const otherPlayerInputRef = useRef(null);

  const gameAnimationIdRef = useRef(null);
  const waitAnimationIdRef = useRef(null);
  const resultAnimationIdRef = useRef(null);

  const volumeSum = useRef(0);
  const myVolumeSum = useRef(0);
  const otherVolumeSum = useRef(0);

  useEffect(() => {
    if (!gameResource) {
      return;
    }

    const { playerAvatar, otherAvatar, pad, skill, resultImage } = gameResource;
    const ctx = canvasRef.current.getContext("2d");
    let frameCount = 0;
    let spriteCount = 0;
    randomBackground = pickRandom(backgroundImages);

    socket.on("input-other-player", (data) => {
      otherPlayerInputRef.current = data;
    });

    if (
      roomStatus === ROOM_STATUS.READY ||
      roomStatus === ROOM_STATUS.WAITING
    ) {
      frameCount = 0;
      spriteCount = 0;

      const drawWait = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        frameCount++;

        if (frameCount % 4 === 0) {
          spriteCount++;
        }

        pad.myPad(ctx);
        playerAvatar.idle(ctx, spriteCount);

        ctx.scale(-1, 1);

        pad.otherPad(ctx);
        if (roomStatus === ROOM_STATUS.READY) {
          otherAvatar.idle(ctx, spriteCount);
        }

        waitAnimationIdRef.current = requestAnimationFrame(drawWait);
      };

      drawWait();
    }

    if (roomStatus === ROOM_STATUS.START) {
      volumeSum.current = 20;
      myVolumeSum.current = 10;
      otherVolumeSum.current = 10;
      frameCount = 0;
      spriteCount = 0;

      const drawGame = () => {
        const volume = volumeMeter.getVolume();
        socket.emit("input-player", volume);

        myVolumeSum.current += volume;
        otherVolumeSum.current += otherPlayerInputRef.current;
        volumeSum.current = myVolumeSum.current + otherVolumeSum.current;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        frameCount++;

        if (frameCount % 4 === 0) {
          spriteCount++;
        }

        pad.myPad(ctx);
        skill.spark(ctx, spriteCount, volumeSum.current, myVolumeSum.current);
        skill.mySkill(ctx, spriteCount, volumeSum.current, myVolumeSum.current);
        playerAvatar.cast(ctx, spriteCount);

        ctx.scale(-1, 1);

        pad.otherPad(ctx);
        skill.otherSkill(
          ctx,
          spriteCount,
          volumeSum.current,
          otherVolumeSum.current
        );
        otherAvatar.cast(ctx, spriteCount);

        gameAnimationIdRef.current = requestAnimationFrame(drawGame);
      };

      drawGame();
    }

    if (roomStatus === ROOM_STATUS.END) {
      frameCount = 0;
      spriteCount = 0;

      if (myVolumeSum.current > otherVolumeSum.current) {
        dispatch(
          gameResultAction("GAME_RESULT", "energyBattle", roomId, player)
        );
      }

      const drawResult = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        frameCount++;

        if (frameCount % 4 === 0) {
          spriteCount++;
        }

        pad.myPad(ctx);

        if (myVolumeSum.current > otherVolumeSum.current) {
          resultImage.win(ctx);
          playerAvatar.idle(ctx, spriteCount);
        } else {
          resultImage.lose(ctx);
          playerAvatar.lose(ctx, spriteCount);
        }

        ctx.scale(-1, 1);

        pad.otherPad(ctx);

        if (myVolumeSum.current > otherVolumeSum.current) {
          otherAvatar.lose(ctx, spriteCount);
        } else {
          otherAvatar.idle(ctx, spriteCount);
        }

        resultAnimationIdRef.current = requestAnimationFrame(drawResult);
      };

      drawResult();
    }

    return () => {
      cancelAnimationFrame(waitAnimationIdRef.current);
      cancelAnimationFrame(gameAnimationIdRef.current);
      cancelAnimationFrame(resultAnimationIdRef.current);
      socket.off("input-other-player");
    };
  }, [roomStatus, canvasHeight, canvasWidth]);

  return (
    <>
      <Canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        margin={["20px", "auto", "0", "auto"]}
        bgImage={randomBackground}
      />
    </>
  );
};

EnergyBattle.propTypes = {
  socket: PropTypes.object.isRequired,
  volumeMeter: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  player: PropTypes.object.isRequired,
  roomStatus: PropTypes.string.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  gameResource: PropTypes.object,
};

export default EnergyBattle;
