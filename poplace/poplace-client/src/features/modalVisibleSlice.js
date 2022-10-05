import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const modalVisibleSlice = createSlice({
  name: "modalVisible",
  initialState,
  reducers: {
    turnOnOffModal: (state, action) => {
      return action.payload;
    },
  },
});

export const { turnOnOffModal } = modalVisibleSlice.actions;

export default modalVisibleSlice.reducer;

export const selectModalOn = (state) => state.modalVisible;
