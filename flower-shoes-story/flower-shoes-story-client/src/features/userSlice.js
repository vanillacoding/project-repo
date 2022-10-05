import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    save: (_, action) => {
      return action.payload;
    },
    remove: () => {
      return null;
    },
  },
});

export const { save, remove } = userSlice.actions;

export default userSlice.reducer;
