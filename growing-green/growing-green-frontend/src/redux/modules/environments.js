import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { weatherURL } from '../../configs';
import { MESSAGES } from '../../constants';
import { convertKelvinToCelsius } from '../../utils/convertKelvinToCelsius';

export const getCurrentWeather = createAsyncThunk(
  'environments/getCurrentWeather',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(weatherURL);

      return response.data;
    } catch (err) {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const slice = createSlice({
  name: 'environments',
  initialState: {
    weather: '',
    temperature: '',
    iconPath: '',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      const { main, weather } = action.payload;
      state.weather = weather[0].main;
      state.iconPath = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
      state.temperature = convertKelvinToCelsius(main.temp);
    });

    builder.addCase(getCurrentWeather.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default slice.reducer;
