import { useEffect, useState } from "react";
import { READY, START, NEW_SELECTOR, SELECT_SUCCESS, COUNTDOWN, NEW_LEADER, GAME_OVER } from "../constants/socketEvents";

const initialPlayer = {
  id: "",
  point: 0,
  isReady: false,
  isSelector: false,
  isLeader: false,
};

function usePlayer(socket, player = initialPlayer) {
  const penaltyTime = 5000;
  const id = player.id || socket.id;
  const [point, setPoint] = useState(player.point);
  const [isReady, setIsReady] = useState(player.isReady);
  const [isSelector, setIsSelector] = useState(player.isSelector);
  const [isLeader, setIsLeader] = useState(player.isLeader);
  const [hasPenalty, setHasPenalty] = useState(false);

  useEffect(() => {
    const handleReady = (isReady, playerId) => {
      setIsReady((prev) => playerId === id ? isReady : prev);
    };

    const handleStart = () => setIsReady(false);
    const handleNewSelector = (playerId) => setIsSelector(playerId === id);
    const handleSelectSuccess = (point, playerId) => {
      if (playerId === id) {
        setPoint(point);
        setIsSelector(false);
      }
    };

    const handleNewLeader = (leaderId) => {
      if (leaderId === id) {
        setIsLeader(true);
        setIsReady(false);
      }
    };

    const handleGameOver = () => setPoint(0);

    socket.on(READY, handleReady);
    socket.on(START, handleStart);
    socket.on(NEW_SELECTOR, handleNewSelector);
    socket.on(SELECT_SUCCESS, handleSelectSuccess);
    socket.on(NEW_LEADER, handleNewLeader);
    socket.on(GAME_OVER, handleGameOver);

    return () => {
      socket.off(READY, handleReady);
      socket.off(START, handleStart);
      socket.off(NEW_SELECTOR, handleNewSelector);
      socket.off(SELECT_SUCCESS, handleSelectSuccess);
      socket.off(NEW_LEADER, handleNewLeader);
      socket.off(GAME_OVER, handleGameOver);
    };
  }, [id, player.id, isSelector]);

  useEffect(() => {
    const handleCountDown = (time) => {
      if (time === 0 && isSelector) {
        setIsSelector(false);
        setHasPenalty(true);
      }
    };

    socket.on(COUNTDOWN, handleCountDown);

    return () => socket.off(COUNTDOWN, handleCountDown);
  }, [isSelector]);

  useEffect(() => {
    let timer = null;

    if (hasPenalty) {
      timer = setTimeout(() => {
        setHasPenalty(false);
      }, penaltyTime);
    }

    return () => clearTimeout(timer);
  }, [hasPenalty]);

  return [point, isReady, isSelector, hasPenalty, isLeader, setIsLeader];
}

export default usePlayer;
