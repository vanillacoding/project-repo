import { IUser } from '../api/auth';
import { RUNTIME_ERROR, WRONG_ANSWER, ACCEPTED } from '../constants/submissionResult';

export const convertDateToISOString = (date: Date) => {
  const getTime = date.getTime();
  const tzOffset = date.getTimezoneOffset() * 60000;

  return new Date(getTime - tzOffset).toISOString();
};

export const getLastWeekISOStrings = () => {
  const newDate = new Date();

  return Array.from({ length: 7 }).map(() => {
    const dateString = convertDateToISOString(newDate);
    newDate.setDate(newDate.getDate() - 1);

    return dateString.slice(0, 10);
  });
};

export const getTotalCounts = (user: IUser) => {
  return user.tried_submissions.reduce((acc: { [result: string]: number }, cur) => {
    acc[cur.result]++;

    return acc;
  }, {
    [RUNTIME_ERROR]: 0,
    [WRONG_ANSWER]: 0,
    [ACCEPTED]: 0
  });
};

export const getLastWeekCounts = (user: IUser) => {
  const lastWeekISOStrings = getLastWeekISOStrings();

  return user.tried_submissions.reduce((acc: { [day: string]: number }, cur) => {
    const day = lastWeekISOStrings.find(day => String(cur.created_at).slice(0, 10) === day);

    if (day) {
      acc[day]++;
    }

    return acc;
  }, {
    [lastWeekISOStrings[0]]: 0,
    [lastWeekISOStrings[1]]: 0,
    [lastWeekISOStrings[2]]: 0,
    [lastWeekISOStrings[3]]: 0,
    [lastWeekISOStrings[4]]: 0,
    [lastWeekISOStrings[5]]: 0,
    [lastWeekISOStrings[6]]: 0
  });
};
