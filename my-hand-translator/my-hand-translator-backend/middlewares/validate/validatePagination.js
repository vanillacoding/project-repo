const { TRANSLATIONS } = require("../../constants/error");
const createHttpError = require("../../utils/createHttpError");

const validatePagination = (req, res, next) => {
  const { page, limit = 5 } = req.query;

  try {
    if (!page || !page.trim()) {
      throw createHttpError(400, TRANSLATIONS.NO_PAGE, 4007);
    }

    if (Number.isNaN(Number(page))) {
      throw createHttpError(400, TRANSLATIONS.NAN_PAGE, 4008);
    }

    if (Number.isNaN(Number(limit))) {
      throw createHttpError(400, TRANSLATIONS.NAN_LIMIT, 4009);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = validatePagination;
