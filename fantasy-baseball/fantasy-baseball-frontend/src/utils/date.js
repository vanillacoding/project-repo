import {
  format,
  intervalToDuration,
  parse,
  subDays,
} from "date-fns";

export const formatDate = (date, setting) => format(date, setting);

export const parseDate = (date, setting) => parse(date, setting, new Date());

export const subDate = (date, days) => subDays(date, days);

export const countTime = (now, endTime) => {
  const duration = intervalToDuration({
    start: now,
    end: endTime,
  });

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const hours = formatTime(duration.hours);
  const minutes = formatTime(duration.minutes);
  const seconds = formatTime(duration.seconds);

  return {
    hours,
    minutes,
    seconds,
  };
};
