import io from 'socket.io-client';

import EVENT from '../constants/socketEvent';

const socket = io(process.env.REACT_APP_API_URL);

export const getMySocketId = () => socket.id;

const gameSocket = {
  startGame(data) {
    socket.emit(EVENT.START_GAME, data);
  },
  sendGameStatus(status) {
    socket.emit(EVENT.PROCEED_GAME, status);
  },
  sendNextTurn(next) {
    socket.emit(EVENT.TURN_CHANGE, next);
  },
  sendResetGame(roomId) {
    socket.emit(EVENT.RESET_GAME, roomId);
  },
  listenInitailizingGame(cb) {
    socket.on(EVENT.INIT_GAME, cb);
  },
  listenProceedGame(cb) {
    socket.on(EVENT.PROCEED_GAME, cb);
  },
  listenTurnChange(cb) {
    socket.on(EVENT.TURN_CHANGE, cb);
  },
  listenResetGame(cb) {
    socket.on(EVENT.RESET_GAME, cb);
  },
  cleanUpGameListener() {
    socket.off(EVENT.INIT_GAME);
    socket.off(EVENT.PROCEED_GAME);
    socket.off(EVENT.TURN_CHANGE);
    socket.off(EVENT.RESET_GAME);
  },
};

const roomSocket = {
  createRoom({ roomData }, cb) {
    socket.emit(EVENT.CREATE_ROOM, { roomData }, cb);
  },
  updateRoomList() {
    socket.emit(EVENT.ROOM_LIST);
  },
  joinRoom({ roomId, user }, cb) {
    socket.emit(EVENT.JOIN_ROOM, { roomId, user }, cb);
  },
  leaveRoom({ roomId }) {
    socket.emit(EVENT.LEAVE_ROOM, { roomId });
  },
  updateRoomLockingStatus({ roomId, isLocked }) {
    socket.emit(EVENT.LOCKING_STATUS, { roomId, isLocked });
  },
  listenUpdateRoomList(cb) {
    socket.on(EVENT.ROOM_LIST, cb);
  },
  listenMemberJoined(cb) {
    socket.on(EVENT.MEMBER_JOINED, cb);
  },
  listenMemberLeaved(cb) {
    socket.on(EVENT.MEMBER_LEAVED, cb);
  },
  listenUpdateRoomLockingStatus(cb) {
    socket.on(EVENT.LOCKING_STATUS, cb);
  },
  renderFilter({ roomId, isFilterOn, filter }) {
    socket.emit(EVENT.VIDEO_FILTER, { roomId, isFilterOn, filter });
  },
  listenRenderFilter(cb) {
    socket.on(EVENT.VIDEO_FILTER, cb);
  },
  cleanUpLobbyListener() {
    socket.off(EVENT.ROOM_LIST);
  },
  cleanUpRoomListener() {
    socket.off(EVENT.MEMBER_JOINED);
    socket.off(EVENT.MEMBER_LEAVED);
    socket.off(EVENT.LOCKING_STATUS);
    socket.off(EVENT.VIDEO_FILTER);
  },
};

const chatSocket = {
  sendMessage({ newChat }) {
    socket.emit(EVENT.CHAT, { chat: newChat });
  },
  listenMessage(cb) {
    socket.on(EVENT.CHAT, cb);
  },
  cleanUpMessageListener() {
    socket.off(EVENT.CHAT);
  },
};

const peerSocket = {
  sendingSignal({ signal, receiver }) {
    socket.emit(EVENT.SENDING_SIGNAL, { signal, receiver });
  },
  listenSendingSignal(cb) {
    socket.on(EVENT.SENDING_SIGNAL, cb);
  },
  returnSignal({ signal, receiver }) {
    socket.emit(EVENT.RETURNING_SIGNAL, { signal, receiver });
  },
  listenReturningSignal(cb) {
    socket.on(EVENT.RETURNING_SIGNAL, cb);
  },
  cleanUpPeerListener() {
    socket.off(EVENT.SENDING_SIGNAL);
    socket.off(EVENT.RETURNING_SIGNAL);
  },
};

export { roomSocket, chatSocket, peerSocket, gameSocket };
