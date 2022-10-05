import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

import fetchData from "../utils/fetchData";
import { initFavoriteCourses } from "./favoriteCoursesSlice";
import { initFavoriteSites } from "./favoriteSitesSlice";
import { initMyCourses } from "./myCoursesSlice";

export const loginUser = createAsyncThunk(
  "user/loginUserStatus",
  async ({ user, token }, { dispatch }) => {
    const { token: tokenByFetch, user: userByFetch } = token
      ? await fetchData("GET", "/user")
      : await fetchData("POST", "/auth/login", user);

    await SecureStore.setItemAsync("token", tokenByFetch);

    const { favoriteCourses, favoriteSites, myCourses } = userByFetch;

    dispatch(initFavoriteCourses(favoriteCourses));
    dispatch(initFavoriteSites(favoriteSites));
    dispatch(initMyCourses(myCourses));

    const {
      _id,
      email,
      name,
      photoUrl,
    } = userByFetch;

    return {
      _id,
      email,
      name,
      photoUrl,
    };
  },
);

const initialState = {
  value: null,
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: () => {
      SecureStore.deleteItemAsync("token");

      return initialState;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [loginUser.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.value = action.payload;
        state.status = "idle";
      }
    },
    [loginUser.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.error = action.error.message;
        state.status = "idle";
      }
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user.value || {};
