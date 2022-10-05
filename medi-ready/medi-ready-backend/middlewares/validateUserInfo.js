const createError = require("http-errors");
const isValid = require("../utils/isValid");

const { MESSAGE } = require("../constants");

const validateUserInfo = (req, res, next) => {
  const { email, name, user_type } = req.body;

  try {
    if (isValid.input(email, name, user_type)) {
      return next();
    }

    throw createError(502, MESSAGE.INVALID_USER_DATA);
  } catch (error) {
    return next(error);
  }
};

module.exports = validateUserInfo;
