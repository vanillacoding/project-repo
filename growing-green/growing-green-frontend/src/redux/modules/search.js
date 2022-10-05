import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MESSAGES } from '../../constants';
import apiController from '../../configs/apiController';

export const searchPlantNames = createAsyncThunk(
  'search/getPlantNames',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await apiController.get(`search?keyword=${keyword}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const searchPlantInfo = createAsyncThunk(
  'search/searchPlantInfo',
  async (number, { rejectWithValue }) => {
    try {
      const response = await apiController.get(`search/${number}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const slice = createSlice({
  name: 'search',
  initialState: {
    plantList: [],
    plantInfo: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    clearPlantList: (state) => {
      state.plantList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchPlantNames.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(searchPlantNames.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.plantList = data;
      state.isLoading = false;
    });

    builder.addCase(searchPlantNames.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(searchPlantInfo.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(searchPlantInfo.fulfilled, (state, action) => {
      const { plantData } = action.payload;
      state.plantInfo = plantData;
      state.isLoading = false;
    });

    builder.addCase(searchPlantInfo.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default slice.reducer;

export const { clearPlantList } = slice.actions;
