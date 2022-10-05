import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVideoConnected: false,
  videoChatId: '',
};

export const videoChatSlice = createSlice({
  name: 'videoChat',
  initialState,
  reducers: {
    joinVideoChat: (state, action) => {
      state.isVideoConnected = true;
      state.videoChatId = action.payload.videoChatId;
    },
    leaveVideoChat: (state) => {
      state.isVideoConnected = false;
      state.videoChatId = null;
    },
  },
});

export const {
  joinVideoChat,
  leaveVideoChat,
} = videoChatSlice.actions;

export default videoChatSlice.reducer;
