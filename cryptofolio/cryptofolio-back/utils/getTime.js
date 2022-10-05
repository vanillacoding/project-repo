const dayjs = require("dayjs");

exports.getTime = () => {
  return dayjs(Date.now()).format("HH:mm");
};
