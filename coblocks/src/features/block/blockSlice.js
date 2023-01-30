import { createSlice } from "@reduxjs/toolkit";

const blockSlice = createSlice({
  name: "blockSlice",
  initialState: {
    translatedBlocks: [],
    executingBlock: "",
    isMusicPlaying: false,
  },
  reducers: {
    resetTranslatedBlocks: (state) => {
      state.translatedBlocks = [];
    },
    resetExecutingBlock: (state) => {
      state.executingBlock = "";
    },
    updateTranslatedBlocks: (state, action) => {
      state.translatedBlocks = action.payload;
    },
    updateExecutingBlock: (state, action) => {
      state.executingBlock = action.payload;
    },
    updateIsMusicPlay: (state, action) => {
      state.isMusicPlaying = action.payload;
    },
  },
});

export { blockSlice };
export const {
  resetTranslatedBlocks,
  resetExecutingBlock,
  updateTranslatedBlocks,
  updateExecutingBlock,
  updateIsMusicPlay,
} = blockSlice.actions;
