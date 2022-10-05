import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playList: [],
  currentIdx: null,
  isPlaying: false,
  musicControlBtn: false,
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    clearMusicStatus: (state, action) => {
      let currentState = state;
      currentState = initialState;
      return currentState;
    },
    setPlayList: (state, action) => {
      state.playList = action.payload;
    },
    listenMusic: (state, action) => {
      state.currentIdx = action.payload;
    },
    goToNextTrack: (state, action) => {
      state.currentIdx = state.currentIdx + 1;

      if (state.currentIdx === state.playList.length) {
        state.currentIdx = 0;
      }
    },
    goToPrevTrack: (state, action) => {
      state.currentIdx = state.currentIdx - 1;

      if (state.currentIdx === -1) {
        state.currentIdx = state.playList.length - 1;
      }
    },
  },
});

const {
  listenMusic,
  setPlayList,
  setIsPlaying,
  goToNextTrack,
  goToPrevTrack,
  clearMusicStatus,
  goToFirstTrack,
} = musicSlice.actions;

export {
  listenMusic,
  setPlayList,
  setIsPlaying,
  goToNextTrack,
  goToPrevTrack,
  clearMusicStatus,
  goToFirstTrack,
};
