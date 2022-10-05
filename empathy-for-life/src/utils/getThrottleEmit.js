import throttle from "lodash.throttle";
import socket from "../socket/socket";

const getThrottleEmit = (wait = 0, throttleSettings = { leading: true, trailing: false }) => {
  return throttle((room, value) => socket.emit(room, value), wait, throttleSettings);
};

export default getThrottleEmit;
