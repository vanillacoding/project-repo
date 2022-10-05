import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import getEnvVars from "../config/environment";
const { API_SERVER_URL } = getEnvVars();

export const signinUser = createAsyncThunk("user/signinUserStatus", async (user) => {
  const { email } = user;

  await SecureStore.setItemAsync("email", email);

  const response = await axios.post(`${API_SERVER_URL}/users/login`, { email });

  const { id, token, isOriginalMember, image, pushAlarmStatus, nickname } = response.data;

  await SecureStore.setItemAsync("token", token);

  return {
    info: {
      id,
      email,
      nickname,
      image,
      isOriginalMember,
      pushAlarmStatus,
    },
  };
});

const initialState = {
  info: {
    id: null,
    email: null,
    nickname: null,
    image: null,
    isOriginalMember: null,
    pushAlarmStatus: null,
  },
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: () => {
      return initialState;
    },
    addImage: (state, action) => {
      state.info.image = action.payload;

      return state;
    },
    addNickname: (state, action) => {
      state.info.nickname = action.payload;

      return state;
    },
  },
  extraReducers: {
    [signinUser.pending]: (state) => {
      state.status = "pending";
    },
    [signinUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.info = action.payload.info;
    },
    [signinUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const { logoutUser, addImage, addNickname } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user.info;
