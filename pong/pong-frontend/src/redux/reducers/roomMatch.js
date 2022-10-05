import { createAction, createReducer } from "@reduxjs/toolkit";

const RESET_STATE = "RESET_STATE";
const UPDATE_SIGNAL = "UPDATE_SIGNAL";
const UPDATE_ROOMMATCH = "UPDATE_ROOMMATCH";
const UPDATE_TEXTSENDING = "UPDATE_TEXTSENDING";

export const resetState = createAction(RESET_STATE);
export const updateSignal = createAction(UPDATE_SIGNAL);
export const updateRoomMatch = createAction(UPDATE_ROOMMATCH);
export const updateTextSending = createAction(UPDATE_TEXTSENDING);

const initialState = {
  isMatched: false,
  partner: {
    socketId: "",
    name: "",
  },
  chats: [],
  webcam: {
    isCalling: false,
    isCallAccepted: false,
    callerSignal: null,
  },
  gameBoard: {
    isModerator: false,
  }
};

export default createReducer(initialState, {
  [UPDATE_ROOMMATCH]: (state, { payload }) => {
    return {
      ...state,
      ...payload,
    };
  },
  [UPDATE_TEXTSENDING]: (state, { payload }) => {
    const newChats = state.chats.slice();
    newChats.push(payload);

    return {
      ...state,
      chats: newChats,
    };
  },
  [UPDATE_SIGNAL]: (state, { payload }) => {
    return {
      ...state,
      webcam: {
        ...state.webcam,
        callerSignal: payload,
        isCalling: false,
        isCallAccepted: true,
      }
    }
  },
  [RESET_STATE]: () => {
    return Object.assign({}, initialState);
  },
});
