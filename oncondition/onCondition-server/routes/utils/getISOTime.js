const NUMBERS = require("../../constants/numbers");
const timeGap = 15;

function getISOTime(today) {
  today.setUTCHours(
    timeGap, 0, 0, 0,
  );

  const pastMidnightInMS = today;
  const todayMidnightInMS = today + NUMBERS.A_DAY_IN_MS;
  const pastAWeekAgoInMS = pastMidnightInMS - NUMBERS.A_WEEK_IN_MS;
  const pastAMonthAgoInMS = pastMidnightInMS - NUMBERS.A_MONTH_IN_MS;

  const pastMidnight = new Date(pastMidnightInMS);
  const todayMidnight = new Date(todayMidnightInMS);
  const pastAWeekAgo = new Date(pastAWeekAgoInMS);
  const pastAMonthAgo = new Date(pastAMonthAgoInMS);

  return {
    pastMidnight,
    todayMidnight,
    pastAWeekAgo,
    pastAMonthAgo,
  };
}

module.exports = getISOTime;
