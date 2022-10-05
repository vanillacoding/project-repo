import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';
import postAPI from '../api/post';

export const fetchFilteredPosts = createAsyncThunk(
  'filteredPosts/fetchFilteredPosts',
  async ({ page, selectedHamsterTypes }, thunkAPI) => {
    try {
      const response = await postAPI.requestGetPosts(
        page,
        Object.keys(selectedHamsterTypes)
      );

      if (response.data.posts.length === 0) {
        return thunkAPI.rejectWithValue();
      }

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const filteredPostsAdapter = createEntityAdapter({
  selectId: (posts) => posts._id
});

const initialState = filteredPostsAdapter.getInitialState({
  page: 1,
  isScrollEnd: false,
  selectedHamsterTypes: {},
  isLoading: true,
  isError: false,
  errorMessage: ''
});

export const filteredPostSlice = createSlice({
  name: 'filteredPost',
  initialState,
  reducers: {
    initFeeds(state, action) {
      state.page = 1;
      filteredPostsAdapter.removeAll(state);
    },
    addType(state, action) {
      state.selectedHamsterTypes[action.payload] = true;
    },
    deleteType(state, action) {
      delete state.selectedHamsterTypes[action.payload];
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchFilteredPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page + 1;
      filteredPostsAdapter.upsertMany(state, action.payload.posts);
    });
    builder.addCase(fetchFilteredPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFilteredPosts.rejected, (state, action) => {
      state.isError = true;
    });
  }
});

export const { actions, reducer } = filteredPostSlice;
export const { initFeeds, addType, deleteType } = actions;
export default reducer;

export const {
  selectById: selectFilteredPostById,
  selectIds: selectFilteredPostIds,
  selectEntities: selectFilteredPostEntities,
  selectAll: selectAllFilteredPosts,
  selectTotal: selectTotalFilteredPosts
} = filteredPostsAdapter.getSelectors((state) => state.filteredPost);
