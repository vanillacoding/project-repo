import { useState, useEffect } from "react";
import getDate from "../utils/getDate";
import { ALERT } from "../constants";

export default function useInterval(
  isFromMainPage,
  isCreator,
  isSavedUser,
  createdAt,
  savedAt,
  navigation
  ) {
  const [remainTime, setRemainTime] = useState();

  useEffect(() => {
    const id = setInterval(() => {
      if (isFromMainPage) {
        const timeInfo = getDate(createdAt);

        if (!timeInfo) {
          navigation.replace("MainNavigator", { "screen": "HomeScreen", path: "Main" });
          return;
        }

        setRemainTime(`남은시간 ${timeInfo}`);
        return;
      }

      if (isCreator && savedAt) {
        const timeInfo = getDate(savedAt);

        if (!timeInfo) {
          setRemainTime(ALERT.pinTimeOver);
          return;
        }

        setRemainTime(`남은시간 ${timeInfo}`);
        return;
      }

      if (isCreator && !savedAt) {
        const timeInfo = getDate(createdAt);

        if (!timeInfo) {
          setRemainTime(ALERT.pinTimeOver);
          return;
        }

        setRemainTime(`남은시간 ${timeInfo}`);
        return;
      }

      if (isSavedUser) {
        const timeInfo = getDate(savedAt);

        if (!timeInfo) {
          navigation.replace("MainNavigator", { "screen": "HomeScreen", path: "Main" });
          return;
        }

        setRemainTime(`남은시간 ${timeInfo}`);
        return;
      }

      const timeInfo = getDate(createdAt);

      setRemainTime(`남은시간 ${timeInfo}`);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return { remainTime };
}
