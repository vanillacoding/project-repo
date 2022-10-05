import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasError: false,
  statusCode: 200,
  message: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action) {
      state.hasError = true;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
    },
    removeError(state) {
      state.hasError = false;
      state.statusCode = 200;
      state.message = "";
    },
  },
});

export const { setError, removeError } = errorSlice.actions;
export default errorSlice.reducer;
