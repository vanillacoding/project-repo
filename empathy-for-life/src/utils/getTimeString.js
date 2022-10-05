const getTimeString = (miliseconds = 0) => {
  const date = new Date(miliseconds);
  let hours = date.getHours();
  const prefix = hours < 12 ? "오전" : "오후";
  hours = hours <= 12 ? hours : hours - 12;
  let minutes = date.getMinutes();

  return `${prefix} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export default getTimeString;
