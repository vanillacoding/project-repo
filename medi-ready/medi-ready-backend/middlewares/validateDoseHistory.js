const createError = require("http-errors");
const validateId = require("uuid-validate");

const { MESSAGE } = require("../constants");

const validateDoseHistory = (req, res, next) => {
  const doseHistory = req.body;
  const { doseHistoryId } = req.params;

  try {
    if (
      doseHistory.hasOwnProperty("morning") &&
      doseHistory.hasOwnProperty("lunch") &&
      doseHistory.hasOwnProperty("dinner") &&
      doseHistory.hasOwnProperty("before_bed") &&
      validateId(doseHistoryId)
    ) {
      return next();
    }

    throw createError(400, MESSAGE.INVALID_DOSE_HISTORY);
  } catch (error) {
    return next(error);
  }
};

module.exports = validateDoseHistory;
