import io from 'socket.io-client';
import { JOIN_ROOM, LEAVE_ROOM, SHARING_NOTE_TYPED } from '../constants/socketEvents';

export const socket = io.connect(process.env.REACT_APP_SERVER_URL);

export function emitJoinRoom(branchId) {
  if (!branchId) return;

  socket.emit(JOIN_ROOM, branchId);
}

export function emitLeaveRoom(branchId) {
  if (!branchId) return;

  socket.emit(LEAVE_ROOM, branchId);
}

export function emitTyping(branchId, value) {
  if (!branchId) return;

  socket.emit(SHARING_NOTE_TYPED, branchId, value);
}

export function listenForTyping(setValue) {
  socket.on(SHARING_NOTE_TYPED, value => setValue(value));
}
