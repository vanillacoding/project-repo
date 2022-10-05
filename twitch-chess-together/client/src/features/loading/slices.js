import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sequence: 0,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    nextSequence: (state) => {
      state.sequence += 1;
    },
    initializeSequence: (state) => {
      state.sequence = 0;
    },
  },
});

export const { nextSequence, initializeSequence } = loadingSlice.actions;

export default loadingSlice.reducer;
