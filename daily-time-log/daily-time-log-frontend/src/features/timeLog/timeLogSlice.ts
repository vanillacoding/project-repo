import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { createTimeLog } from "../../utils/createTimeLog";

export interface RunningTimeType {
  _id?: string;
  milestone: Milestone;
  start: {
    dateTime: string;
    timezone: string;
  };
  end: {
    dateTime: string;
    timezone: string;
  };
}

export interface TimeLogState {
  allHourIds: number[];
  byHourId: {
    [hourId: number]: {
      [minuteId: string]: Milestone;
    };
  };
}

interface Milestone {
  color?: string;
  summary?: string;
}

const initialState: TimeLogState = {
  allHourIds: [],
  byHourId: {},
};

const timeLogSlice = createSlice({
  name: "timeLog",
  initialState,
  reducers: {
    loadTimeLog: (state) => {
      const { allHourIds, byHourId } = createTimeLog();

      state.allHourIds = allHourIds;
      state.byHourId = byHourId;
    },
    addRunningTimes: (state, action: PayloadAction<RunningTimeType[]>) => {
      const runningTimes = action.payload;

      for (let i = 0; i < runningTimes.length; i++) {
        const startInfo = runningTimes[i].start;
        const endInfo = runningTimes[i].end;
        const startMinute = dayjs(startInfo.dateTime).tz(startInfo.timezone);
        const endMinute = dayjs(endInfo.dateTime).tz(endInfo.timezone);
        const minuteDiff = endMinute.diff(startMinute.format("YYYY-MM-DDTHH:mm"), "minute");

        for (let j = 0; j < minuteDiff + 1; j++) {
          const hourId = Number(startMinute.set({ minute: startMinute.minute() + j }).format("HH"));
          const minuteId = startMinute.set({ minute: startMinute.minute() + j }).format("HH:mm");

          if (!state.byHourId[hourId]) {
            state.byHourId[hourId] = {};
          }

          state.byHourId[hourId][minuteId] = {
            color: runningTimes[i].milestone.color,
            summary: runningTimes[i].milestone.summary,
          };
        }
      }
    },
  },
});

export const { loadTimeLog, addRunningTimes } = timeLogSlice.actions;

export default timeLogSlice.reducer;
