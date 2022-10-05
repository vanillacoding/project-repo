import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  err: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName (state, action) {
      const payload = action.payload;
      state.userInfo = payload;
    },
    updateUserThumnail (state, action) {
      const payload = action.payload;
      state.userInfo = payload;     
    },
    followUser (state, action) {
      const payload = action.payload;
      state.userInfo = payload;     
    },
    unfollowUser (state, action) {
      const payload = action.payload;
      state.userInfo = payload;     
    },
  },
});

export const {
  updateUserName,
  updateUserThumnail,
  followUser,
  unfollowUser,
} = userSlice.actions;

export default userSlice.reducer;
