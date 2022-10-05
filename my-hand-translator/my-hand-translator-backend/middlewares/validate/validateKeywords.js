const { SIGNUP } = require("../../constants/error");

const createHttpError = require("../../utils/createHttpError");

const validateKeywords = (req, res, next) => {
  const { keywords } = req.body;

  try {
    if (!keywords && keywords.length) {
      throw createHttpError(502, SIGNUP.NO_KEYWORDS, 1003);
    }

    const isValidKeywordLength = keywords.every(
      ({ length }) => length > 0 && length <= 100,
    );

    if (!isValidKeywordLength) {
      throw createHttpError(502, SIGNUP.INVALID_KEYWORD_LENGTH, 1005);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = validateKeywords;
