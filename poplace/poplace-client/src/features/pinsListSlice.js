import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import getEnvVars from "../config/environment";
const { API_SERVER_URL } = getEnvVars();

export const getPinsList = createAsyncThunk("pin/getPinsList", async (location) => {
  const token = await SecureStore.getItemAsync("token");

  const response = await axios.get(`${API_SERVER_URL}/pins`, {
    params: location,
    validateStatus: (status) => status < 500,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.data;
});

const initialState = {
  pinsList: [
    {
      _id: null,
      createAt: null,
      creator: null,
      active: null,
      dist: {
        calculated: null,
      },
      image: [],
      position: {
        coordinates: [null, null],
      },
      tags: [],
      text: null,
    },
  ],
  status: "idle",
  error: null,
};

const pinsListSlice = createSlice({
  name: "pinsList",
  initialState,
  reducers: {
    initPinsList: (state, action) => {
      return initialState;
    },
  },
  extraReducers: {
    [getPinsList.pending]: (state) => {
      state.status = "pending";
    },
    [getPinsList.fulfilled]: (state, action) => {
      state.status = "success";
      state.pinsList = action.payload.pinsList;
    },
    [getPinsList.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
  },
});

export const { initPinsList } = pinsListSlice.actions;

export default pinsListSlice.reducer;

export const selectPinsList = (state) => state.pinsList;
