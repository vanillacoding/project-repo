const createError = require("http-errors");
const isValid = require("../utils/isValid");

const { MESSAGE } = require("../constants");

const validateAlarmTime = (req, res, next) => {
  const { alarmTime } = req.body;

  try {
    if (isValid.alarmTime(alarmTime)) {
      return next();
    }

    throw createError(400, MESSAGE.INVALID_INFORMATION);
  } catch (error) {
    return next(error);
  }
};

module.exports = validateAlarmTime;
