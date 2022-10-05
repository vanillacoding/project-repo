function getTimeFormat(time) {
  return time < 10 ? "0" + time : time;
}

function getDate() {
  const date = new Date();

  const hour = getTimeFormat(date.getHours());
  const minute = getTimeFormat(date.getMinutes());

  return `${hour}:${minute}`;
}

export default getDate;
