import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  creator: null,
  image: [],
  text: null,
  tags: [],
  savedUser: null,
  createdAt: null,
  saveAt: null,
  location: null,
  active: null,
};

const currentPinSlice = createSlice({
  name: "currentPin",
  initialState,
  reducers: {
    addCurrentPin: (state, action) => {
      state = { ...action.payload };
      return state;
    },
  },
});

export const { addCurrentPin } = currentPinSlice.actions;

export default currentPinSlice.reducer;

export const selectCurrentPin = (state) => state.currentPin;
