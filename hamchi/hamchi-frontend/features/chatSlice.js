import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEntered: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    enterChat(state, action) {
      state.isEntered = true;
    },
    leaveChat(state, action) {
      state.isEntered = false;
    }
  },
  extraReducers: {
  }
});

export const { actions, reducer } = chatSlice;

export const { enterChat, leaveChat } = actions;

export default reducer;
