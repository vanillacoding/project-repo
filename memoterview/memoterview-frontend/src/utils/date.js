import { format, parseISO } from "date-fns";

export function changeDateFormat(date, dateFormat) {
  const parsedDate = parseISO(date);

  return format(parsedDate, dateFormat);
};

export function formatTimeForTimer(time, emptySpace = true) {
  let minute = Math.floor(time / 60);
  let hour = Math.floor(minute / 60);
  let second = time % 60;
  minute = minute % 60;

  hour = hour < 10 && emptySpace ? `0${hour}` : hour;
  minute = minute < 10 && emptySpace ? `0${minute}` : minute;
  second = second < 10 && emptySpace ? `0${second}` : second;

  return { hour, minute, second };
}
