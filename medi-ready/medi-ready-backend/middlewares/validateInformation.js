const createError = require("http-errors");
const isValid = require("../utils/isValid");

const { MESSAGE } = require("../constants");

const validateInformation = (req, res, next) => {
  const { name, address } = req.body;

  try {
    if (isValid.input(name, address)) {
      return next();
    }

    throw createError(400, MESSAGE.INVALID_INFORMATION);
  } catch (error) {
    return next(error);
  }
};

module.exports = validateInformation;
