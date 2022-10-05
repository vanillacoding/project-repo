import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDone: false,
};

export const slice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    isImageLoadDone: (state) => {
      state.isDone = true;
    },
  },
});

export default slice.reducer;

export const { isImageLoadDone } = slice.actions;
