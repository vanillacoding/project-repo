import dayjs from "dayjs";
import { TimeLogState } from "../features/timeLog/timeLogSlice";

const START_TIME = 0;

export const createTimeLog = () => {
  const allHourIds = [];
  const byHourId: TimeLogState["byHourId"] = {};

  for (let hour = START_TIME; hour < START_TIME + 24; hour++) {
    allHourIds.push(hour);
    byHourId[hour] = {};

    for (let minute = 0; minute < 60; minute++) {
      const minuteId = dayjs().set({ hour, minute }).format("HH:mm");

      byHourId[hour][minuteId] = {};
    }
  }

  return { allHourIds, byHourId };
};
