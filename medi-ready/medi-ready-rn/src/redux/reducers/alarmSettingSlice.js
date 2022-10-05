import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  isLoading: false,
  alarmTimes: {
    morning: "08:00",
    lunch: "12:00",
    dinner: "18:00",
    beforeBed: "22:00",
  },
};

export const alarmSettingSlice = createSlice({
  name: "alarmSetting",
  initialState,
  reducers: {
    getAlarmTime: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    setAlarm: (state, action) => {
      const { dosePeriod, alarmTime } = action.payload;

      state.alarmTimes[dosePeriod] = alarmTime;
      state.error = null;
    },
    saveAlarm: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    completeAlarmSetting: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.alarmTimes = action.payload;
    },
    failAlarmSetting: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setAlarm,
  saveAlarm,
  getAlarmTime,
  failAlarmSetting,
  completeAlarmSetting,
} = alarmSettingSlice.actions;

export default alarmSettingSlice.reducer;
