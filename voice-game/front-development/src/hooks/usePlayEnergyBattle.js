import { useState, useCallback } from "react";
import getMedia from "../utils/getMedia";
import VolumeMeter from "../utils/VolumeMeter";
import wait from "../utils/wait";
import { ROOM_STATUS } from "../constants/constants";

/**
 *
 * @param {func} setRoomStatus change Room Status function
 * @param {func} setIsStartDisabled change StartDisabled function
 * @returns volumeMeter, counter, playgame
 */
const usePlayEnergyBattle = (setRoomStatus, setIsStartDisabled) => {
  const [volumeMeter, setVolumeMeter] = useState({});
  const [counter, setCounter] = useState("");

  const playGame = useCallback(async () => {
    setIsStartDisabled(true);
    setRoomStatus(ROOM_STATUS.READY);

    const mediaStream = await getMedia({ audio: true });
    const volumeMeterObj = new VolumeMeter(mediaStream, {
      bufferSize: 2048,
      minDecibels: -60,
      maxDecibels: -30,
      timeConstant: 0.9,
    });

    setCounter("3");
    await wait(1000);
    setCounter("2");
    await wait(1000);
    setCounter("1");
    await wait(1000);
    setCounter("SHOUT!!");

    setVolumeMeter(volumeMeterObj);
    setRoomStatus(ROOM_STATUS.START);

    await wait(5000);

    setCounter("3");
    await wait(1000);
    setCounter("2");
    await wait(1000);
    setCounter("1");
    await wait(1000);
    setCounter("END");

    setRoomStatus(ROOM_STATUS.END);
    setIsStartDisabled(false);
    setVolumeMeter({});

    mediaStream.getTracks()[0].stop();

    await wait(3000);
    setRoomStatus(ROOM_STATUS.READY);
    setCounter("");
  }, [setIsStartDisabled, setRoomStatus]);

  return [volumeMeter, counter, playGame];
};

export default usePlayEnergyBattle;
