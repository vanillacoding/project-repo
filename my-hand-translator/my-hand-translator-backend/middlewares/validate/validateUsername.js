const { SIGNUP } = require("../../constants/error");

const createHttpError = require("../../utils/createHttpError");

const validateUsername = (req, res, next) => {
  const { name } = req.body;

  try {
    if (!name) {
      throw createHttpError(502, SIGNUP.NO_NAME, 1002);
    }

    if (!(name.length >= 1 && name.length <= 100)) {
      throw createHttpError(502, SIGNUP.INVALID_NAME_LENGTH, 1002);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = validateUsername;
