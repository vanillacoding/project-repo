import { createSlice } from '@reduxjs/toolkit';
import { calculatePlantInfo } from '../../utils/calcuatePlantInfo';
import addHours from 'date-fns/addHours';

const initialState = {
  isTimeTravelMode: false,
  currentPlant: null,
  plantsInWeek: [],
  weekNumber: 0,
};

export const slice = createSlice({
  name: 'timeTravel',
  initialState,
  reducers: {
    startTimeTravel: (state, action) => {
      const plant = action.payload;
      const today = new Date();
      const weather = 'Clear';
      const plantsInWeek = [];

      for (let i = 1; i < 8; i++) {
        const updatedPlant = calculatePlantInfo(
          plant,
          weather,
          addHours(today, i * 24),
        );

        plantsInWeek.push(updatedPlant);
      }

      state.isTimeTravelMode = true;
      state.currentPlant = plant;
      state.plantsInWeek = plantsInWeek;
    },
    stopTimeTravel: (state) => {
      state.isTimeTravelMode = false;
    },
    selectWeekNumber: (state, action) => {
      state.weekNumber = action.payload;
    },
  },
});

export default slice.reducer;

export const { startTimeTravel, stopTimeTravel, selectWeekNumber } =
  slice.actions;
