export function getIsoDate(time) {
  let timeObj = new Date(time);
  timeObj = new Date(timeObj.getTime() - (timeObj.getTimezoneOffset() * 60000))
  return timeObj.toISOString().split('T')[0];
};

export function getDateRange(startTime, endTime) {
  const startTimeNum = new Date(startTime).setHours(0, 0, 0, 0).valueOf();
  const endTimeNum = new Date(endTime).valueOf();

  const dates = [];
  let currentTimeNum = startTimeNum;
  while (currentTimeNum < endTimeNum) {
    dates.push(getIsoDate(currentTimeNum));
    currentTimeNum = addDays(currentTimeNum, 1);
  }
  return dates;
};

export function addDays(time, n){
  let timeObj = new Date(time);
  return timeObj.setDate(timeObj.getDate() + n);
};
