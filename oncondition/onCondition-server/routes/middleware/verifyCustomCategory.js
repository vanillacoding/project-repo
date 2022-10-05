const createError = require("http-errors");
const { NOT_FOUND } = require("../../constants/statusCodes");
const { ERROR } = require("../../constants/messages");

function verifyCustomCategory(req, res, next) {
  const { category: categoryName } = req.params;
  const { creator } = req;

  const categoryInfo = creator.customCategories.find(
    ({ category }) => category === categoryName,
  );

  if (!categoryInfo) {
    return next(createError(NOT_FOUND, ERROR.INVALID_PATH));
  }

  req.categoryType = categoryInfo.categoryType;
  next();
}

module.exports = verifyCustomCategory;
