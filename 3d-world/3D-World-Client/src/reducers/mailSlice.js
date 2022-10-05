import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import fetchData from "../utils/fetchData";

export const getMailList = createAsyncThunk(
  "mail/getMailList",
  async () => {
    const response = await fetchData("GET", "/mailbox");

    return response;
  },
);

export const deleteMailList = createAsyncThunk(
  "mail/deleteMailList",
  async () => {
    const response = await fetchData("DELETE", "/mailbox");

    return response;
  },
);

export const deleteMailItem = createAsyncThunk(
  "mail/deleteMailItem",
  async (mailId) => {
    const response = await fetchData("DELETE", `/mailbox/mail/${mailId}`);

    return response;
  },
);

export const readMailItem = createAsyncThunk(
  "mail/readMailItem",
  async (mailId) => {
    const response = await fetchData("PATCH", "/mailbox/read", { mailId });

    return response;
  },
);

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    updateError: (state, action) => {
      state.status = "pending";
      state.error = action.payload.message;
    },
  },
  extraReducers: {
    [getMailList.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [getMailList.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload;
      }
    },
    [getMailList.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.error.message || null;
      }
    },
    [deleteMailList.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [deleteMailList.fulfilled]: (state) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data.mails = [];
      }
    },
    [deleteMailList.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.error.message || null;
      }
    },
    [deleteMailItem.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [deleteMailItem.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data.mails = state.data.mails
          .filter((mail) => mail._id !== action.payload);
      }
    },
    [deleteMailItem.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.error.message || null;
      }
    },
    [readMailItem.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [readMailItem.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.data = action.payload;
      }
    },
    [readMailItem.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.error = action.error.message || null;
      }
    },
  },
});

export const { updateError } = mailSlice.actions;

export default mailSlice.reducer;

export const mailSelector = (state) => state.mail.data;
