exports.getUTCHour = (alarmTime, time) => {
  let hour = alarmTime[time].split(":")[0] - 9;
  const minute = String(alarmTime[time].split(":")[1]).padStart(2, "0");

  if (hour < 0) {
    hour = hour + 24;
  }

  hour = String(hour).padStart(2, "0");

  return { hour, minute };
};
