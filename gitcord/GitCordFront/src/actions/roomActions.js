import {
  DELETE_ROOM,
  RECEIVE_CHAT,
  RECEIVE_DOCUMENT_TEXT,
  SET_ROOM_INFO,
  SET_ROOM_LIST,
  LEAVE_ROOM,
  LEAVE_OWNER_ROOM,
  RECEIVE_EDITOR_TYPING_INFO,
  RECEIVE_EDITOR_TYPING_USERS
} from "../constants/actionTypes";

export function initRoomInfo(roomInfo) {
  return {
    type: SET_ROOM_INFO,
    payload: roomInfo
  };
}

export function initRoomList(activedRoomList) {
  return {
    type: SET_ROOM_LIST,
    payload: activedRoomList
  };
}

export function receiveChat(chatLogs) {
  return {
    type: RECEIVE_CHAT,
    payload: chatLogs
  };
}

export function receiveDocumentText(text) {
  return {
    type: RECEIVE_DOCUMENT_TEXT,
    payload: text
  };
}

export function receiveTypingInfo(typingInfo) {
  return {
    type: RECEIVE_EDITOR_TYPING_INFO,
    payload: typingInfo
  };
}

export function receiveTypingUsers(typingUsers) {
  return {
    type: RECEIVE_EDITOR_TYPING_USERS,
    payload: typingUsers
  }
}

export function leaveRoom() {
  return {
    type: LEAVE_ROOM
  };
}

export function leaveOwnerRoom() {
  return {
    type: LEAVE_OWNER_ROOM
  };
}

export function deleteRoom() {
  return {
    type: DELETE_ROOM
  };
}
