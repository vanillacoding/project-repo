import { format } from 'date-fns';

export const getFormatedDate = (date) => {
  const dateString = format(date, 'yyyy MMM EEEE dd');
  const dateList = dateString.split(' ');

  return {
    year: dateList[0],
    month: dateList[1],
    week: dateList[2],
    day: dateList[3],
  };
};
