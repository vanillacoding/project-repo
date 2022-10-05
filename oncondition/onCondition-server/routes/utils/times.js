function setTimeMidnight(dateObject = new Date()) {
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const date = dateObject.getDate();
  const timeOmitted = new Date(
    year, month, date, 0, 0, 0,
  );

  return timeOmitted;
}

function getDateMillis(days) {
  const endTime = setTimeMidnight();
  const endTimeMillis = endTime.getTime();
  const startTimeMillis = endTime.setDate(endTime.getDate() - days);

  return { startTimeMillis, endTimeMillis };
}

module.exports = { setTimeMidnight, getDateMillis };
