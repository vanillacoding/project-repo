import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const initialState = {
  currentDate: format(new Date(), 'yyyy-MM-dd'),
};

export const slice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    changeCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
  },
});

export default slice.reducer;

export const { changeCurrentDate } = slice.actions;
