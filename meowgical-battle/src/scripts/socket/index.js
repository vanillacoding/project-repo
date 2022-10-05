import socketIOClient from "socket.io-client";

const socket = socketIOClient(
  process.env.SERVER_URL
);

const createGame = (playerId) => {
  socket.emit("createGame", { playerId });
};

const removeGame = (playerId) => {
  socket.emit("removeGame", { playerId });
};

const joinGame = (playerId, invitationCode) => {
  socket.emit("joinGame", { playerId, invitationCode });
};

const leaveGame = (playerId, invitationCode) => {
  socket.emit("leaveGame", { playerId, invitationCode });
};

const broadcastAction = (action) => {
  socket.emit("broadcastAction", action);
};

const subscribeJoinResult = (handleJoinResultListen) => {
  socket.on("notifyJoinResult", handleJoinResultListen);
};

const unsubscribeJoinResult = () => {
  socket.off("notifyJoinResult");
};

const subscribeRoomState = (handleRoomStateListen) => {
  socket.on("notifyRoomState", handleRoomStateListen);
};

const unsubscribeRoomState = () => {
  socket.off("notifyRoomState");
};

export default {
  createGame,
  removeGame,
  joinGame,
  leaveGame,
  broadcastAction,
  subscribeJoinResult,
  unsubscribeJoinResult,
  subscribeRoomState,
  unsubscribeRoomState,
};
