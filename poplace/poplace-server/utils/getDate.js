const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

const { PIN_COUNT } = require("../constants");

function getDate(time) {
  const targetTime = dayjs(time);
  const currentTime = dayjs(new Date());

  const difference = currentTime.diff(targetTime, "second");

  if (difference >= PIN_COUNT) {
    return true;
  }

  return false;
}

module.exports = getDate;
