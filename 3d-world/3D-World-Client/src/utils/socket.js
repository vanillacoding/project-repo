import io from "socket.io-client";
import EVENTS from "../constants/socketEvents";

const {
  JOIN_WORLD,
  LEAVE_WORLD,
  JOIN_ROOM,
  LEAVE_ROOM,
  USER_MOVEMENT,
  UPDATE_MOVEMENT,
  OLD_USER_INFO,
  CHAT_MESSAGE,
  FURNITURE_MOVEMENT,
  NEW_USER_SOCKET_ID,
} = EVENTS;

const socket = io(process.env.REACT_APP_SERVER_URL);

function disconnectSocket() {
  socket.disconnect();
}

function getMySocketId() {
  return socket.id;
}

const worldSocket = {
  joinWorld: (userInfo) => {
    socket.emit(JOIN_WORLD, userInfo);
  },
  leaveWorld: () => {
    socket.emit(LEAVE_WORLD);
  },
  sendUserMovement: (userInfo) => {
    socket.emit(USER_MOVEMENT, userInfo);
  },
  sendOldUserInfo: (userInfo) => {
    socket.emit(OLD_USER_INFO, userInfo);
  },
  listenNewUserInfo: (cb) => {
    socket.on(JOIN_WORLD, cb);
  },
  listenNewUserSocketId: (cb) => {
    socket.on(NEW_USER_SOCKET_ID, cb);
  },
  listenOldUserInfo: (cb) => {
    socket.on(OLD_USER_INFO, cb);
  },
  listenUserMovement: (id, cb) => {
    socket.on(UPDATE_MOVEMENT(id), cb);
  },
  listenUserLeave: (cb) => {
    socket.on(LEAVE_WORLD, cb);
  },
  removeWorldListeners: () => {
    socket.off(JOIN_WORLD);
    socket.off(NEW_USER_SOCKET_ID);
    socket.off(OLD_USER_INFO);
    socket.off(LEAVE_WORLD);
  },
};

const roomSocket = {
  joinRoom: (data) => {
    socket.emit(JOIN_ROOM, data);
  },
  leaveRoom: () => {
    socket.emit(LEAVE_ROOM);
  },
  listenUserJoin: (cb) => {
    socket.on(JOIN_ROOM, cb);
  },
  // user movement
  sendUserMovement: (data) => {
    socket.emit(USER_MOVEMENT, data);
  },
  listenUserMovement: (cb) => {
    socket.on(USER_MOVEMENT, cb);
  },
  listenNewUserSocketId: (cb) => {
    socket.on(NEW_USER_SOCKET_ID, cb);
  },
  sendOldUserInfo: (receiver, data) => {
    socket.emit(OLD_USER_INFO, { receiver, posInfo: data });
  },
  listenOldUserInfo: (cb) => {
    socket.on(OLD_USER_INFO, cb);
  },
  listenUserLeave: (cb) => {
    socket.on(LEAVE_ROOM, cb);
  },
  // chat
  sendChatMessage: (data) => {
    socket.emit(CHAT_MESSAGE, data);
  },
  listenChatMessage: (cb) => {
    socket.on(CHAT_MESSAGE, cb);
  },
  offChatMessage: (cb) => {
    socket.off(CHAT_MESSAGE, cb);
  },
  // clear
  removeAllRoomListeners: () => {
    socket.removeAllListeners();
  },
};

const furnitureSocket = {
  sendUpdatedFurniture: (data) => {
    socket.emit(FURNITURE_MOVEMENT, data);
  },
  listenFurnitureMovement: (cb) => {
    socket.on(FURNITURE_MOVEMENT, cb);
  },
  removeFurnitureListeners: () => {
  },
};

export {
  disconnectSocket,
  roomSocket,
  worldSocket,
  getMySocketId,
  furnitureSocket,
};
