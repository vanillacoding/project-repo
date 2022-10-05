const createError = require("http-errors");
const User = require("../../models/User");
const Comment = require("../../models/Comment");
const NUMBERS = require("../../constants/numbers");
const ACCESS_LEVELS = require("../../constants/accessLevels");
const { ERROR } = require("../../constants/messages");
const {
  OK, CREATED, BAD_REQUEST, UNAUTHORIZED,
} = require("../../constants/statusCodes");

async function deleteCategory(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const { category } = req.params;
    const user = await User.findById(req.userId);
    const categories = user.customCategories;
    const categoryNames = categories.map(({ category }) => category);

    if (!categoryNames.length) {
      throw createError(BAD_REQUEST, ERROR.INVALID_ALREADY_DELETED_CATEGORY);
    }

    if (!categoryNames.includes(category)) {
      throw createError(BAD_REQUEST, ERROR.INVALID_ALREADY_DELETED_CATEGORY);
    }

    const { customCategories } = await User.findByIdAndUpdate(req.userId,
      { $pull: { customCategories: { category } } },
      { new: true },
    );

    await Comment.deleteMany({ category });

    res.status(OK);
    res.json({ result: "OK", data: customCategories });
  } catch (err) {
    next(err);
  }
}

async function addCategory(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const { category, categoryType } = req.body;
    const user = await User.findById(req.userId);
    const categories = user.customCategories;
    const categoryNames = categories.map(({ category }) => category);

    if (
      Array.isArray(categories)
      && categories.length === NUMBERS.MAX_CATEGORIES
    ) {
      throw createError(BAD_REQUEST, ERROR.INVALID_USING_MAX_CATEGORIES);
    }

    if (Array.isArray(categories) && categoryNames.includes(category)) {
      throw createError(BAD_REQUEST, ERROR.INVALID_OVERLAP_CATEGORY_NAME);
    }

    const { customCategories } = await User.findByIdAndUpdate(req.userId,
      { $push: { customCategories: [{ category, categoryType }] } },
      { new: true },
    );

    res.status(CREATED);
    res.json({ result: "OK", data: customCategories });
  } catch (err) {
    next(err);
  }
}

module.exports = { deleteCategory, addCategory };
