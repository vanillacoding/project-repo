import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoryPosts } from "../api/postApi";

import {
  LOVE,
  PAIN,
  COURSE,
  FRIEND,
  EMPLOYMENT
} from "../constants/category";

export const fetchEmploymentPosts = createAsyncThunk(
  "post/fetchEmploymentPosts",
  async (categoryInfo, thunkAPI) => {
    try {
      const response = await getCategoryPosts(categoryInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchLovePosts = createAsyncThunk(
  "post/fetchLovePosts",
  async (categoryInfo, thunkAPI) => {
    try {
      const response = await getCategoryPosts(categoryInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchCoursePosts = createAsyncThunk(
  "post/fetchCoursePosts",
  async (categoryInfo, thunkAPI) => {
    try {
      const response = await getCategoryPosts(categoryInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const fetchFriendPosts = createAsyncThunk(
  "post/fetchFriendPosts",
  async (categoryInfo, thunkAPI) => {
    try {
      const response = await getCategoryPosts(categoryInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const fetchPainPosts = createAsyncThunk(
  "post/fetchPainPosts",
  async (categoryInfo, thunkAPI) => {
    try {
      const response = await getCategoryPosts(categoryInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  message: null,
  isLoading: false,
  isFetched: {
    "??????": false,
    "??????": false,
    "??????": false,
    "??????": false,
    "??????": false
  },
  post: {
    "??????": [],
    "??????": [],
    "??????": [],
    "??????": [],
    "??????": []
  },
  bestPost: {
    "??????": null,
    "??????": null,
    "??????": null,
    "??????": null,
    "??????": null
  }
};

export const categoryPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPostState: () => {
      return initialState;
    },
    refreshPostCategory: (state, { payload }) => {
      state.post[payload] = [];
      state.bestPost[payload] = [];
      state.isFetched[payload] = false;
    },
    clearMessage: (state) => {
      state.message = null;
    }
  },
  extraReducers: {
    [fetchEmploymentPosts.fulfilled]: (state, { payload }) => {
      state.isFetched[EMPLOYMENT] = true;
      state.bestPost[EMPLOYMENT] = payload.highestLikesPost;
      state.post[EMPLOYMENT] = [...state.post[EMPLOYMENT], ...payload.categoryPosts];
      state.isLoading = false;
    },
    [fetchEmploymentPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchEmploymentPosts.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [fetchLovePosts.fulfilled]: (state, { payload }) => {
      state.isFetched[LOVE] = true;
      state.bestPost[LOVE] = payload.highestLikesPost;
      state.post[LOVE] = [...state.post[LOVE], ...payload.categoryPosts];
      state.isLoading = false;
    },
    [fetchLovePosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLovePosts.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [fetchCoursePosts.fulfilled]: (state, { payload }) => {
      state.isFetched[COURSE] = true;
      state.bestPost[COURSE] = payload.highestLikesPost;
      state.post[COURSE] = [...state.post[COURSE], ...payload.categoryPosts];
      state.isLoading = false;
    },
    [fetchCoursePosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCoursePosts.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [fetchFriendPosts.fulfilled]: (state, { payload }) => {
      state.isFetched[FRIEND] = true;
      state.bestPost[FRIEND] = payload.highestLikesPost;
      state.post[FRIEND] = [...state.post[FRIEND], ...payload.categoryPosts];
      state.isLoading = false;
    },
    [fetchFriendPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchFriendPosts.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },
    [fetchPainPosts.fulfilled]: (state, { payload }) => {
      state.isFetched[PAIN] = true;
      state.bestPost[PAIN] = payload.highestLikesPost;
      state.post[PAIN] = [...state.post[PAIN], ...payload.categoryPosts];
      state.isLoading = false;
    },
    [fetchPainPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPainPosts.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    }
  }
});
