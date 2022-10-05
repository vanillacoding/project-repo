import dayjs from "dayjs";

import { ByDateId, DateInfo } from "../features/calendar/calendarSlice";

const DAYS_IN_WEEK = 7;
const DATE_FORMAT = "YYYY-MM-DD";

export const createCalendarData = ({ year, month: currentMonth, date, timezone }: DateInfo) => {
  const calendarAllDatesId: string[] = [];
  const calendarByDateId: ByDateId = {};

  const displayedDate = dayjs().set({ year, month: currentMonth, date }).tz(timezone);
  const prevMonthLastDate = displayedDate.set({ date: 0 }).tz(timezone);
  const currentMonthFirstDate = displayedDate.set({ date: 1 }).tz(timezone);
  const currentMonthLastDate = displayedDate.daysInMonth();
  const nextMonthFirstDate = displayedDate.set({ date: currentMonthLastDate + 1 }).tz(timezone);

  const currentMonthFirstDay = displayedDate.set({ date: 1 }).day();

  const todayDateId = dayjs().format(DATE_FORMAT);

  for (let i = 0; i < currentMonthFirstDay; i++) {
    const year = prevMonthLastDate.year();
    const month = prevMonthLastDate.month();
    const date = prevMonthLastDate.date() - prevMonthLastDate.day() + i;
    const dateId = prevMonthLastDate.set({ date }).format(DATE_FORMAT);

    calendarAllDatesId.push(dateId);
    calendarByDateId[dateId] = {
      id: dateId,
      year,
      month,
      date,
      isCurrentMonth: false,
      isToday: todayDateId === dateId,
      isSunday: i % DAYS_IN_WEEK === 0,
      isSaturday: false,
      schedules: [],
      runningTimes: [],
    };
  }

  for (let i = 0; i < currentMonthLastDate; i++) {
    const date = i + 1;
    const dateId = currentMonthFirstDate.set({ date }).format(DATE_FORMAT);

    calendarAllDatesId.push(dateId);
    calendarByDateId[dateId] = {
      id: dateId,
      year,
      month: currentMonth,
      date,
      isCurrentMonth: true,
      isToday: todayDateId === dateId,
      isSunday: (currentMonthFirstDay + i) % DAYS_IN_WEEK === 0,
      isSaturday: (currentMonthFirstDay + i) % DAYS_IN_WEEK === 6,
      schedules: [],
      runningTimes: [],
    };
  }

  let nextMonthDaysLength = DAYS_IN_WEEK - (calendarAllDatesId.length % 7);

  if (calendarAllDatesId.length + nextMonthDaysLength < 42) {
    nextMonthDaysLength += 7;
  }

  for (let i = 0; i < nextMonthDaysLength; i++) {
    const year = nextMonthFirstDate.year();
    const month = nextMonthFirstDate.month();
    const date = i + 1;
    const firstDay = nextMonthFirstDate.day();

    const dateId = nextMonthFirstDate.set({ date }).format(DATE_FORMAT);

    calendarAllDatesId.push(dateId);
    calendarByDateId[dateId] = {
      id: dateId,
      year,
      month,
      date,
      isCurrentMonth: false,
      isToday: todayDateId === dateId,
      isSunday: (firstDay + i) % DAYS_IN_WEEK === 0,
      isSaturday: (firstDay + i) % DAYS_IN_WEEK === 6,
      schedules: [],
      runningTimes: [],
    };
  }

  return { calendarAllDatesId, calendarByDateId };
};
