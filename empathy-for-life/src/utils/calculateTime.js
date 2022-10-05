const calculateTime = (sec) => {
  const times = [];
  let updateTime = sec;

  for (let i = 0; i <= 3; i++) {
    if (i === 2) {
      times[i] = updateTime % 24;
      updateTime = Math.trunc(updateTime / 24);
    } else if (i === 3) {
      times[i] = updateTime;
    } else {
      times[i] = updateTime % 60;
      updateTime = Math.trunc(updateTime / 60);
    }
  }

  return times.reduce((timeString, time, index) => {
    const colon = index < 2 ? ":" : "";
    const zero = time < 10 ? "0" : "";
    if (index === 3) {
      return `${time}일 ${timeString}`;
    } else {
      return `${colon}${zero}${time}` + timeString;
    }
  }, "");
};

export default calculateTime;
