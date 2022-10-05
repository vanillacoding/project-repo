import io from "socket.io-client";

import {
  RECEIVE_CHAT,
  RECEIVE_TEXT,
  RECEIVE_DOCUMENT_TEXT,
  RECEIVE_PARTICIPANTS,
  RECEIVE_TARGET_ROOM_INFO,
  RECEIVE_ACTIVE_ROOM_LIST,
  RECEIVE_FILTERED_USER_LIST
} from "../constants/socketEvents";

import {
  receiveChat,
  receiveDocumentText,
  receiveTypingInfo,
  initRoomInfo,
  initRoomList,
  deleteRoom,
  receiveTypingUsers
} from "../actions/roomActions";

export const socket = io.connect(
  process.env.REACT_APP_SERVER_URL
);

export function subscribeSocket(dispatch) {
  socket.on(RECEIVE_CHAT, (chatInfo) => {
    dispatch(receiveChat(chatInfo));
  });

  socket.on(RECEIVE_TEXT, (typingInfo) => {
    dispatch(receiveTypingInfo(typingInfo));
  });

  socket.on(RECEIVE_DOCUMENT_TEXT, (text) => {
    dispatch(receiveDocumentText(text));
  });

  socket.on(RECEIVE_PARTICIPANTS, (roomInfo) => {
    if (!roomInfo) return dispatch(deleteRoom());

    dispatch(initRoomInfo(roomInfo));
  });

  socket.on(RECEIVE_TARGET_ROOM_INFO, (roomInfo) => {
    dispatch(initRoomInfo(roomInfo));
  });

  socket.on(RECEIVE_ACTIVE_ROOM_LIST, (activedRoomList) => {
    dispatch(initRoomList(activedRoomList));
  });

  socket.on(RECEIVE_FILTERED_USER_LIST, (typingUsers) => {
    dispatch(receiveTypingUsers(typingUsers));
  });
}

export function cancelSocketSubscription() {
  socket.off(RECEIVE_CHAT);
  socket.off(RECEIVE_PARTICIPANTS);
  socket.off(RECEIVE_ACTIVE_ROOM_LIST);
  socket.off(RECEIVE_FILTERED_USER_LIST);
  socket.off(RECEIVE_TEXT);
  socket.off(RECEIVE_DOCUMENT_TEXT);
  socket.off(RECEIVE_TARGET_ROOM_INFO);
}
