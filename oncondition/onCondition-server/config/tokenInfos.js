const { ONE_DAY_IN_SECOND, ONE_MINUTE_IN_SECOND } = require("../constants/times");

const seven = 7;
const ISSUER = "onCondition-admin";
const sevenDays = ONE_DAY_IN_SECOND * seven;
const ACCESS_DURATION = ONE_MINUTE_IN_SECOND * seven;
const REFRESH_DURATION = sevenDays;

module.exports = {
  ISSUER, ACCESS_DURATION, REFRESH_DURATION,
};
