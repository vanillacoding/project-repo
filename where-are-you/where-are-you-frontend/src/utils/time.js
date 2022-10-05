const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

const convertTime = (time) => {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time - hours * 3600) / 60);
  let seconds = time % 60;

  return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
};

export default convertTime;