import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiController from '../../configs/apiController';
import { MESSAGES } from '../../constants';

export const getAllPlantsByUserId = createAsyncThunk(
  'plants/getAllPlantsByUserId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiController.get('plants');

      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const getMostPopularPlants = createAsyncThunk(
  'plants/getMostPopularPlants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiController.get('plants/popular');
      
      return response.data;
    } catch {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const createNewPlant = createAsyncThunk(
  'plants/createNewPlant',
  async (
    { history, name, species, type, isSunPlant, watering, growthStage },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await apiController.post('plants/new', {
        name,
        species,
        type,
        isSunPlant,
        watering,
        growthStage,
      });

      dispatch(getAllPlantsByUserId());

      const { plant } = response.data;
      history.push(`/plants/${plant._id}`);

      return plant;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updatePlant = createAsyncThunk(
  'plants/updatePlant',
  async ({ plantId, data }, { rejectWithValue }) => {
    try {
      const response = await apiController.put(`plants/${plantId}`, data);

      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const updateAllPlant = createAsyncThunk(
  'plants/UpdatePlantAll',
  async (plant, { rejectWithValue }) => {
    try {
      const response = await apiController.put(`plants`, plant);

      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const deletePlant = createAsyncThunk(
  'plants/deletePlant',
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await apiController.delete(`plants/${plantId}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const slice = createSlice({
  name: 'plants',
  initialState: {
    allPlants: {},
    popularPlants: [],
    error: null,
    isLoading: false,
    currentPlant: null,
  },
  reducers: {
    changeCurrentPlant: (state, action) => {
      state.currentPlant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPlantsByUserId.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllPlantsByUserId.fulfilled, (state, action) => {
      const plants = action.payload;

      plants.forEach((plant) => {
        state.allPlants[plant._id] = plant;
      });
      state.currentPlant = plants[0];
      state.isLoading = false;
    });

    builder.addCase(getAllPlantsByUserId.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getMostPopularPlants.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getMostPopularPlants.fulfilled, (state, action) => {
      state.popularPlants = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getMostPopularPlants.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(createNewPlant.fulfilled, (state, action) => {
      const plant = action.payload;

      state.allPlants[plant._id] = plant;
    });

    builder.addCase(createNewPlant.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(updatePlant.fulfilled, (state, action) => {
      const { plant } = action.payload;

      state.allPlants[plant._id] = plant;
    });

    builder.addCase(updatePlant.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default slice.reducer;

export const { changeCurrentPlant } = slice.actions;
