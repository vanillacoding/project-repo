import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';
import postAPI from '../api/post';

export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async (page, thunkAPI) => {
    try {
      const response = await postAPI.requestGetPosts(page, []);

      if (response.data.posts.length === 0) {
        return thunkAPI.rejectWithValue();
      }

      return response.data.posts;
    } catch (err) {
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const initPosts = createAsyncThunk(
  'post/initPosts',
  async (page, thunkAPI) => {
    try {
      const response = await postAPI.requestGetPosts(1, []);

      if (response.data.posts.length === 0) {
        return thunkAPI.rejectWithValue();
      }

      return response.data.posts;
    } catch (err) {
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id
});

const initialState = postsAdapter.getInitialState({
  page: 1,
  isScrollEnd: false,
  isFiltered: false,
  isLoading: true,
  isError: false,
  errorMessage: ''
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    toggleFilter(state, action) {
      state.isFiltered = action.payload;
    },
    initializePosts(state, action) {
      postsAdapter.removeAll(state)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.page = state.page + 1;
      postsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.page = 2;
      postsAdapter.setAll(state, action.payload);
    });
    builder.addCase(initPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(initPosts.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
});

export const { actions, reducer } = postSlice;
export const { toggleFilter, initializePosts } = actions;
export default reducer;

export const {
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: selectTotalPosts
} = postsAdapter.getSelectors((state) => state.post);
