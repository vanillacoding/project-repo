import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';

import submissionAPI from '../api/submissions';
import postAPI from '../api/post';

export const fetchMyPosts = createAsyncThunk(
  'myPost/fetchMyPosts',
  async (myId, thunkAPI) => {
    try {
      const response = await postAPI.requestGetMyPosts(myId);

      return response.data.posts;
    } catch (err) {
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const updateSubmissions = createAsyncThunk(
  'myPost/updateSubmissions',
  async (selectedSubmissions, thunkAPI) => {
    try {
      const response = await submissionAPI
        .requestUpdateSubmissionStatus(Object.keys(selectedSubmissions));

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const closePost = createAsyncThunk(
  'myPost/closePost',
  async (postId, thunkAPI) => {
    try {
      const response = await postAPI.requestClosePost(postId);

      if (response.code === 200) {
        return postId;
      } else {
        throw Error();
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const myPostsAdapter = createEntityAdapter();

const initialState = myPostsAdapter.getInitialState({
  isLoading: true,
  isError: false,
  isRefreshing: false,
  errorMessage: ''
});

export const myPostSlice = createSlice({
  name: 'myPost',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchMyPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      myPostsAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchMyPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMyPosts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(updateSubmissions.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateSubmissions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateSubmissions.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

const {
  actions,
  reducer
} = myPostSlice;

export const {
} = actions;

export default reducer;

export const {
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: selectTotalPosts
} = myPostsAdapter.getSelectors((state) => state.post);
