import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScheduleInfo {
  id: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  creator: {
    email: string;
    self: true;
  };
  start: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
}

interface SchedulesState {
  allSchedulesId: string[];
  byScheduleId: {
    [index: string]: ScheduleInfo;
  };
  schedulesData: ScheduleInfo[];
}

const initialState: SchedulesState = {
  allSchedulesId: [],
  byScheduleId: {},
  schedulesData: [],
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    initGoogleSchedules: (state) => {
      state.allSchedulesId = [];
      state.byScheduleId = {};
    },
    addGoogleSchedules: (state, action: PayloadAction<ScheduleInfo[]>) => {
      const googleSchedules = action.payload;

      const sortedGoogleSchedules = [...googleSchedules].sort(
        (a: ScheduleInfo, b: ScheduleInfo) => {
          return new Date(a.start.date).getTime() - new Date(b.start.date).getTime();
        },
      );

      sortedGoogleSchedules.forEach((item) => {
        state.allSchedulesId.push(item.id);
        state.byScheduleId[item.id] = item;
      });

      state.schedulesData = sortedGoogleSchedules;
    },
    deleteScheduleById: (state, action) => {
      const id = action.payload;

      delete state.byScheduleId[id];
      state.allSchedulesId = state.allSchedulesId.filter((item) => item !== id);
      state.schedulesData = state.schedulesData.filter((item) => item.id !== id);
    },
  },
});

export const { initGoogleSchedules, addGoogleSchedules, deleteScheduleById } =
  schedulesSlice.actions;

export default schedulesSlice.reducer;
