/**
 * @param {Date} time new Date() format
 * @returns {String} hh:mm format
 */

const formatDate = (time) => {
  const date = new Date(time);

  let hour = date.getHours();
  let minute = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${hour}:${minute}`;
};

export default formatDate;
