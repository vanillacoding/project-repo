import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import fetchData from "../utils/fetchData";
import { logoutUser } from "./userSlice";

export const toggleCourseBookmark = createAsyncThunk(
  "favoriteCourses/toggleBookmarkStatus",
  async (courseId, { getState }) => {
    const { favoriteCourses: { items } } = getState();
    const isBookmarked = !!items.find((favorireCourse) => favorireCourse._id === courseId);

    const response = isBookmarked
      ? await fetchData("DELETE", `/user/favoriteCourses/${courseId}`)
      : await fetchData("PATCH", `/user/favoriteCourses/${courseId}`);

    return {
      isBookmarked,
      course: response,
    };
  },
);

const initialState = {
  items: [],
  error: null,
  status: "idle",
};

const favoriteCoursesSlice = createSlice({
  name: "favoriteCourses",
  initialState,
  reducers: {
    initFavoriteCourses: (state, action) => {
      const favoriteCourses = action.payload;

      state.items = favoriteCourses;
    },
  },
  extraReducers: {
    [logoutUser]: () => initialState,
    [toggleCourseBookmark.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [toggleCourseBookmark.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        const { isBookmarked, course } = action.payload;

        state.status = "idle";

        state.items = isBookmarked
          ? state.items.filter((favoriteCourse) => favoriteCourse._id !== course._id)
          : state.items.concat(course);
      }
    },
    [toggleCourseBookmark.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.error = action.error.message;
        state.status = "idle";
      }
    },
  },
});

export const { initFavoriteCourses } = favoriteCoursesSlice.actions;

export default favoriteCoursesSlice.reducer;

export const selectFavoriteCourses = (state) => state.favoriteCourses.items;

export const selectFavoriteCourseByCourseId = createSelector(
  [selectFavoriteCourses, (_, courseId) => courseId],
  (favoriteCourses, courseId) => (
    favoriteCourses.find((favoriteCourse) => favoriteCourse._id === courseId)
  ),
);
