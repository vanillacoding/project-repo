import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { TimeText } from '../shared/index';

const RemainingTime = ({ expiredTime, onTimeEnd, size }) => {
  const [remainingTime, setRemainingTime] = useState('59:59');

  const calculateRemaingTime = () => {
    const parsedTime = parseISO(expiredTime);
    const currentTime = Date.now();
    const remainingTime = parsedTime - currentTime;
    const formattedTime = format(remainingTime - 1000, 'mm:ss');

    setRemainingTime(formattedTime);
  };

  useEffect(() => {
    calculateRemaingTime();
  }, [expiredTime, onTimeEnd]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime === '00:00') {
        clearInterval(intervalId);
        onTimeEnd && onTimeEnd();

        return;
      }

      calculateRemaingTime();
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return <TimeText size={size}>{remainingTime}</TimeText>;
};

export default RemainingTime;
