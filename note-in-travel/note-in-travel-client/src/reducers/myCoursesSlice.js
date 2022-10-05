import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import fetchData from "../utils/fetchData";
import { logoutUser } from "./userSlice";

export const saveMyCourse = createAsyncThunk(
  "myCourses/saveMyCourseStatus",
  async (course) => {
    const response = await fetchData("POST", "/course", course);

    return response;
  },
);

const initialState = {
  items: [],
  error: null,
  status: "idle",
};

const myCoursesSlice = createSlice({
  name: "myCourses",
  initialState,
  reducers: {
    initMyCourses: (state, action) => {
      const myCourses = action.payload;

      state.items = myCourses;
    },
  },
  extraReducers: {
    [logoutUser]: () => initialState,
    [saveMyCourse.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [saveMyCourse.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        const newCourse = action.payload;

        state.items.push(newCourse);
        state.error = null;
        state.status = "idle";
      }
    },
    [saveMyCourse.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.error = action.error.message;
        state.status = "idle";
      }
    },
  },
});

export const { initMyCourses } = myCoursesSlice.actions;

export default myCoursesSlice.reducer;

export const selectMyCourses = (state) => state.myCourses.items;
