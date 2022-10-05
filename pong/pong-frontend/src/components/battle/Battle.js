import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ScoreBoard from "../scoreBoard/ScoreBoard";
import GameBoard from "../gameBoard/GameBoard";
import ChatRoom from "../chatRoom/ChatRoom";
import GameBoy from "../gameBoy/GameBoy";
import Webcam from "../webcam/Webcam";
import GameEndModal from "../gameEndModal/GameEndModal";
import ModalPortal from "../modalPortal/ModalPortal";
import Modal from "../modal/Modal";
import { NUMBERS, MESSAGE } from "../../constants";
import styles from "./Battle.module.css";

const Battle = ({ socket }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [showRecessModal, setRecessModal] = useState(false);
  const [showGameEndModal, setGameEndModal] = useState(false);
  const [count, setCount] = useState(NUMBERS.MODAL_COUNT);
  const [modalCount, setModalCount] = useState(NUMBERS.MODAL_COUNT);
  const [userScore, setUserScore] = useState(NUMBERS.INITIAL_SCORE);
  const [partnerScore, setPartnerScore] = useState(NUMBERS.INITIAL_SCORE);

  const { isMatched } = useSelector(state => state.roomMatch);
  const { isModerator } = useSelector(state => state.roomMatch.gameBoard);

  const timerRef = useRef();
  const gameEndRef = useRef();
  const modalTimerRef = useRef();

  let modal = null;

  useEffect(() => {
    return () => {
      socket.offAny();
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (count === NUMBERS.END_COUNT) {
      clearInterval(timerRef.current);

      setPlaying(true);
    }

    if (isMatched && count === NUMBERS.INITIAL_COUNT) {
      timerRef.current = setInterval(() => {
        setCount((prev) => prev - NUMBERS.SUBTRACT_NUMBER);
      }, NUMBERS.DELAY);
    }
  }, [isMatched, count]);

  const modalCountDown = () => {
    modalTimerRef.current = setInterval(() => {
      setModalCount(prev => {
        if (!prev) {
          clearInterval(modalTimerRef.current);

          setModalCount(NUMBERS.MODAL_COUNT);
          return;
        }

        return prev - NUMBERS.SUBTRACT_NUMBER;
      });
    }, NUMBERS.MODAL_TIMEOUT);
  };

  if (showRecessModal && !showGameEndModal) {
    modal = (
      <ModalPortal>
        <Modal>
          <div>
            {MESSAGE.RECESSMODAL_READY}
          </div>
          <div>
            {`${MESSAGE.RECESSMODAL_COUNTDOWN} ${modalCount}`}
          </div>
        </Modal>
      </ModalPortal>
    );
  }

  if (showGameEndModal) {
    modal = (
      <ModalPortal>
        <Modal>
          <GameEndModal
            userScore={userScore}
            socket={socket}
          />
        </Modal>
      </ModalPortal>
    );
  }

  const plusUserScore = () => {
    if (!gameEndRef.current) setUserScore(prev => prev + 1);
  };

  const plusPartnerScore = () => {
    if (!gameEndRef.current) setPartnerScore(prev => prev + 1);
  };

  return (
    <div className={styles.wrapper}>
      {modal}
      <div className={styles.webcamWrapper}>
        <ScoreBoard
          count={count}
          isMatched={isMatched}
          isPlaying={isPlaying}
          isModerator={isModerator}
          userScore={userScore}
          partnerScore={partnerScore}
        />
        <Webcam
          isMatched={isMatched}
          socket={socket}
        />
      </div>
      <GameBoy>
        {isMatched && count === NUMBERS.END_COUNT
          ? <GameBoard
              socket={socket}
              userScore={userScore}
              partnerScore={partnerScore}
              gameEndRef={gameEndRef}
              showGameEndModal={showGameEndModal}
              setGameEndModal={setGameEndModal}
              plusUserScore={plusUserScore}
              setRecessModal={setRecessModal}
              plusPartnerScore={plusPartnerScore}
              modalCountDown={modalCountDown}
            />
          : <div className={styles.notice} >
              <div>
                {isMatched
                  ? <span className={styles.matchText}>{MESSAGE.MATCHING_USER}</span>
                  : <span>{MESSAGE.FINDING_USER}</span>
                }
              </div>
            </div>}
      </GameBoy>
      <ChatRoom socket={socket} />
    </div>
  );
};

export default Battle;

Battle.propTypes = {
  socket: PropTypes.object.isRequired,
};
