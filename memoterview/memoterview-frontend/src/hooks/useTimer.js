import { useEffect, useState } from "react";

import { formatTimeForTimer } from "../utils/date";

export default function useTimer(initialState = 0) {
  const [timeSecond, setTimeSecond] = useState(initialState);
  const [isActive, setIsActive] = useState(false);

  const { hour, minute, second } = formatTimeForTimer(timeSecond);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = window.setInterval(() => {
        setTimeSecond((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  return { timeSecond, time: { hour, minute, second }, setIsActive };
}
