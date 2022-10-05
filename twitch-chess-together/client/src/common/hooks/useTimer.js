import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectGameCurrentTurn } from '../../features/game/selectors';

const useTimer = (fixedTime) => {
  const [timerInterval, setTimerInterval] = useState(fixedTime);
  const currentTurn = useSelector(selectGameCurrentTurn);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerInterval((prevTime) => {
        return prevTime ? prevTime - 1 : fixedTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerInterval]);

  useEffect(() => {
    setTimerInterval(fixedTime);
  }, [currentTurn]);

  return timerInterval;
};

export default useTimer;
