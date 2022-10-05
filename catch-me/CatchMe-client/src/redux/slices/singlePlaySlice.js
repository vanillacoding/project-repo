import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { gameProgress } from "../../constants/gameState";
import { readGameRecords, createGameClearUserRecord } from "../../api";

export const getGameRecords = createAsyncThunk(
  "single/getGameRecords",
  async () => {
    try {
      const { result, data } = await readGameRecords();

      if (result !== "ok") {
        throw new Error(result);
      }

      return data;
    } catch (error) {
      throw new Error(error);
    }
  },
);

export const saveGameRecord = createAsyncThunk(
  "single/saveGameRecord",
  async ({ id, username, score }) => {
    try {
      const { result } = await createGameClearUserRecord({ id, username, score });

      if (result !== "ok") {
        throw new Error(result);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
);

const initialState = {
  progress: gameProgress.GAME_BEFORE_START,
  records: [],
  error: "",
  status: "idle",
};

const singlePlaySlice = createSlice({
  name: "single",
  initialState,
  reducers: {
    updateGameProgress(state, { payload }) {
      state.progress = payload;
    },
  },
  extraReducers: {
    [getGameRecords.pending]: (state) => {
      state.status = "pending";
    },
    [getGameRecords.fulfilled]: (state, action) => {
      state.status = "idle";
      state.records = action.payload;
    },
    [getGameRecords.rejected]: (state, action) => {
      state.status = "idle";
      state.error = action.error.message || null;
    },
    [saveGameRecord.pending]: (state) => {
      state.status = "pending";
    },
    [saveGameRecord.fulfilled]: (state) => {
      state.status = "idle";
    },
    [getGameRecords.rejected]: (state, action) => {
      state.status = "idle";
      state.error = action.error.message || null;
    },
  }
  
});

export const { updateGameProgress } = singlePlaySlice.actions;

export const gameProgressSelector = ({ single }) => single;

export default singlePlaySlice.reducer;
