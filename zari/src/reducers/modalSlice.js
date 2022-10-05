import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDisplay: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.isDisplay = true;
    },
    hideModal: (state) => {
      state.isDisplay = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
