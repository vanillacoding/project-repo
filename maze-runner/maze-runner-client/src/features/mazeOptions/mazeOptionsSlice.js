import { createSlice } from '@reduxjs/toolkit';
import { getAlgorithmInfo } from '../../util';

const initialState = {
  algorithm: 'none',
  speed: 'fast',
  weighted: 'none',
  shortest: 'none',
};

export const mazeOptionsSlice = createSlice({
  name: 'mazeOptions',
  initialState,
  reducers: {
    setAlgorithm: (state, action) => {
      const newState = getAlgorithmInfo(action.payload);

      state.algorithm = action.payload;
      state.weighted = newState.weighted;
      state.shortest = newState.shortest;
    },
    setSpeed: (state, action) => {
      state.speed = action.payload;
    },
  },
});

export const { setAlgorithm, setSpeed } = mazeOptionsSlice.actions;

export const selectAlgorithm = (state) => state.mazeOptions.algorithm;
export const selectSpeed = (state) => state.mazeOptions.speed;
export const selectMazeOptions = (state) => state.mazeOptions;

export default mazeOptionsSlice.reducer;
