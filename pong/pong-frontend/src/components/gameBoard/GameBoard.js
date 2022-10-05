import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import movePaddle from "./movePaddle";
import drawPaddle from "./paddle";
import drawBall from "./ball";
import data from "./data";
import * as roomMatchActions from "../../redux/reducers/roomMatch";
import { NUMBERS } from "../../constants";
import styles from "./GameBoard.module.css";

const { ballObj, userPaddleObj, partnerPaddleObj } = data;

const GameBoard = (props) => {
  const {
    socket,
    userScore,
    partnerScore,
    gameEndRef,
    plusUserScore,
    plusPartnerScore,
    modalCountDown,
    setRecessModal,
    setGameEndModal,
  } = props;
  const [isReset, setIsReset] = useState(false);
  const [isRoundEnd, setIsRoundEnd] = useState(false);

  const partnerSocketId = useSelector(state => state.roomMatch.partner.socketId);
  const isModerator = useSelector(state => state.roomMatch.gameBoard.isModerator);

  const dispatch = useDispatch();
  const history = useHistory();

  const canvasRef = useRef(null);
  const resetRef = useRef(false);
  const keyDownRef = useRef(false);
  const keyCodeRef = useRef(null);
  const distanceRef = useRef(null);

  useEffect(() => {
    socket.emit("sendCanvas", ({
      canvasWidth: canvasRef.current.width,
      canvasHeight: canvasRef.current.height,
    }));

    socket.on("setDistance", ({ distance }) => {
      distanceRef.current = distance;
    });

    socket.on("moveBall", ({ ballData, end, isBallTop }) => {
      ballObj.x = ballData.x;
      ballObj.y = ballData.y;

      if (end) {
        setIsRoundEnd(true);

        if (isModerator && isBallTop) {
          plusUserScore();

          return;
        }

        if (isModerator && !isBallTop) {
          plusPartnerScore();

          return;
        }

        if (!isModerator && isBallTop) {
          plusPartnerScore();

          return;
        }

        if (!isModerator && !isBallTop) {
          plusUserScore();
        }
      }
    });

    socket.on("userKeyDown", ({ userPaddleX }) => {
      userPaddleObj.x = userPaddleX;
    });

    socket.on("partnerKeyDown", ({ partnerPaddleX }) => {
      partnerPaddleObj.x = partnerPaddleX;
    });

    socket.on("redirectHome", () => {
      dispatch(roomMatchActions.resetState());

      history.push("/");
    });

    return () => {
      socket.emit("refresh");
      setIsRoundEnd(false);
    };
  }, []);

  useEffect(() => {
    if (userScore === NUMBERS.WIN_SCORE || partnerScore === NUMBERS.WIN_SCORE) {
      gameEndRef.current = true;
      setGameEndModal(true);
    }
  }, [userScore, partnerScore]);

  useEffect(() => {
    if (!isRoundEnd) return;

    setRecessModal(true);
    modalCountDown();
    resetRef.current = true;

    setTimeout(() => {
      resetRef.current = false;
      canvasRef.current?.focus();
      setIsReset(prev => !prev);
      setIsRoundEnd(false);
      setRecessModal(false);
    }, NUMBERS.RESET_TIMEOUT);
  }, [isRoundEnd]);

  useEffect(() => {
    socket.emit("startRound");
    canvasRef.current.focus();
    userPaddleObj.x = (canvasRef.current.width / NUMBERS.HALF) - (userPaddleObj.width / NUMBERS.HALF);
    partnerPaddleObj.x = (canvasRef.current.width / NUMBERS.HALF) - (partnerPaddleObj.width / NUMBERS.HALF);

    const render = () => {
      if (resetRef.current) return;
      if (gameEndRef.current) return;

      const canvas = canvasRef.current;

      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      if (isModerator) {
        socket.emit("moveBall", { partnerSocketId });
      }

      if (keyDownRef.current && isModerator) {
        movePaddle(canvas, keyCodeRef.current, userPaddleObj, distanceRef.current);

        socket.emit("userKeyDown", {
          keyCode: keyCodeRef.current,
          partnerSocketId,
        });
      }

      if (keyDownRef.current && !isModerator) {
        movePaddle(canvas, keyCodeRef.current, partnerPaddleObj, distanceRef.current);

        socket.emit("partnerKeyDown", {
          keyCode: keyCodeRef.current,
          partnerSocketId,
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBall(ctx, canvas, ballObj, isModerator);

      if (isModerator) {
        drawPaddle(ctx, canvas, userPaddleObj, ballObj, true);
        drawPaddle(ctx, canvas, partnerPaddleObj, ballObj);
      } else {
        drawPaddle(ctx, canvas, userPaddleObj, ballObj);
        drawPaddle(ctx, canvas, partnerPaddleObj, ballObj, true);
      }

      requestAnimationFrame(render);
    };

    render();
  }, [isReset, isModerator]);

  const handleKeyDown = ({ keyCode }) => {
    if (gameEndRef.current || isRoundEnd) return;

    keyDownRef.current = true;
    keyCodeRef.current = keyCode;
  };

  const handleKeyUp = () => {
    keyDownRef.current = false;
    keyCodeRef.current = null;
  };

  return (
    <div className={styles.wrapper}>
      <canvas
        onKeyDown={(event) => handleKeyDown(event)}
        onKeyUp={handleKeyUp}
        id="canvas"
        className={styles.canvas}
        ref={canvasRef}
        height="700px"
        width="500px"
        tabIndex="0"
      />
    </div>
  );
};

export default GameBoard;

GameBoard.propTypes = {
  socket: PropTypes.object.isRequired,
  userScore: PropTypes.number.isRequired,
  partnerScore: PropTypes.number.isRequired,
  gameEndRef: PropTypes.bool.isRequired,
  plusUserScore: PropTypes.func.isRequired,
  plusPartnerScore: PropTypes.func.isRequired,
  modalCountDown: PropTypes.func.isRequired,
  setRecessModal: PropTypes.func.isRequired,
  setGameEndModal: PropTypes.func.isRequired,
};
