const TYPE = {
  GOMSIN: "gomsin",
  SOLDIER: "soldier",
};

const NUMBER = {
  ONEDAY: 1000 * 60 * 60 * 24,
};

const MESSAGE = {
  AUTHORIZED: "user authorized successfully",
};

const EVENTS = {
  JOIN: "join",
  GET_MESSAGES: "getMessage",
  SEND_MESSAGE: "sendMessage",
  SET_START_POSITION: "setStartPosition",
  RESET_START_POSITION: "resetStartPosition",
  LISTEN_JUMP_DIRECTION: "listenJumpDirection",
  DISCONNECT: "disconnect",
};

module.exports = { NUMBER, MESSAGE, TYPE, EVENTS };
