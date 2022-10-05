const { format } = require("date-fns");
const { BETTING_END_TIME, GAME_START_TIME } = require("../constants/game");

const checkDay = (day) => {
  if (day === "Sat") {
    return "saturday";
  }

  if (day === "Sun") {
    return "sunday";
  }

  return "weekdays";
};

const checkBettingOpened = (date) => {
  const localDate = format(date, "eee:kk:mm:ss");
  const today = checkDay(localDate.substring(0, 3));
  const now = localDate.substring(4, 12);

  if (now > BETTING_END_TIME[today]) {
    return false;
  }

  if (now < GAME_START_TIME[today]) {
    return false;
  }

  return true;
};

module.exports = checkBettingOpened;
