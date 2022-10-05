import { createSlice } from "@reduxjs/toolkit";

export const preloadSlice = createSlice({
  name: "preload",
  initialState: {
    isLoaded: false,
  },
  reducers: {
    set: (state, _) => {
      state.isLoaded = true;
    },
  },
});

export const { set } = preloadSlice.actions;

export default preloadSlice.reducer;
