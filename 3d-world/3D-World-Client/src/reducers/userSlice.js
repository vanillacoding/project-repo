import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../api";
import fetchData from "../utils/fetchData";

export const getUserByToken = createAsyncThunk(
  "user/getUserByToken",
  async () => {
    const response = await fetchData("GET", "/user");

    return response;
  },
);

export const userLogin = createAsyncThunk(
  "user/login",
  async () => {
    const response = await API.onSocialLogin();

    return response;
  },
);

export const updateUserData = createAsyncThunk(
  "user/update",
  async (data) => {
    const response = await fetchData("PATCH", "/user", data);

    return response;
  },
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async () => {
    const response = await fetchData("GET", "/user/logout");

    return response;
  },
);

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, action) => {
      state.status = "idle";
      state.error = action.error.message;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [userLogin.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload;
        state.error = null;
      }
    },
    [userLogin.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.error.message || null;
      }
    },
    [userLogout.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [userLogout.fulfilled]: (state) => {
      if (state.status === "pending") {
        return initialState;
      }
    },
    [userLogout.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.error.message || null;
      }
    },
    [updateUserData.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [updateUserData.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload;
      }
    },
    [updateUserData.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.error.message;
      }
    },
    [getUserByToken.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [getUserByToken.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload ?? null;
      }
    },
    [getUserByToken.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.error.message;
      }
    },
  },
});

export const { updateError } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user.data;
export const userIdSelector = (state) => state.user.data?._id || null;
export const userNameSelector = (state) => state.user.data.name;
export const userFriendsSelector = (state) => state.user.data.friends;
