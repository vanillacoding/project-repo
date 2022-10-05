const validator = require("email-validator");

const { SIGNUP } = require("../../constants/error");
const createHttpError = require("../../utils/createHttpError");

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw createHttpError(502, SIGNUP.NO_EMAIL, 1000);
    }

    if (!validator.validate(email)) {
      throw createHttpError(502, SIGNUP.INVALID_EMAIL, 1001);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = validateEmail;
