import {
  NEW_PLAYER, START, COUNTDOWN, GAME_OVER,
  READY, NEW_SELECTOR, SELECT_SUCCESS, NEW_LEADER,
} from "../constants/socketEvents";

function removeSocketListeners(socket) {
  socket.removeAllListeners(NEW_PLAYER);
  socket.removeAllListeners(READY);
  socket.removeAllListeners(START);
  socket.removeAllListeners(NEW_SELECTOR);
  socket.removeAllListeners(SELECT_SUCCESS);
  socket.removeAllListeners(COUNTDOWN);
  socket.removeAllListeners(NEW_LEADER);
  socket.removeAllListeners(GAME_OVER);
};

export default removeSocketListeners;
