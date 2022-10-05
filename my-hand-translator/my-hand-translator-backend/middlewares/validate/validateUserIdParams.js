const validator = require("email-validator");

const { TRANSLATIONS } = require("../../constants/error");
const createHttpError = require("../../utils/createHttpError");

const validateUserIdParams = (req, res, next) => {
  const { user_id: userId } = req.params;

  try {
    if (!validator.validate(userId)) {
      throw createHttpError(400, TRANSLATIONS.INVALID_USER_ID, 4005);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = validateUserIdParams;
