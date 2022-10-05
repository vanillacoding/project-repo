const createError = require("http-errors");
const mongoose = require("mongoose");

const Comment = require("../../models/Comment");
const Activity = require("../../models/Activity");
const Album = require("../../models/CustomAlbum");
const Grid = require("../../models/CustomGrid");
const Meal = require("../../models/Meal");
const Sleep = require("../../models/Sleep");

const {
  validateBody, isValidText, isValidDate,
} = require("../utils/validations");
const { capitalize } = require("../utils/capitalize");
const ACCESS_LEVELS = require("../../constants/accessLevels");
const {
  OK, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED,
} = require("../../constants/statusCodes");
const { ERROR } = require("../../constants/messages");

const RatingModels = {
  Activity,
  Album,
  Grid,
  Meal,
  Sleep,
};

const categoryModelName = {
  activity: "Activity",
  album: "CustomAlbum",
  grid: "CustomGrid",
  meal: "Meal",
  sleep: "Sleep",
};

function getCategoryType(categoryName, customCategories) {
  if (["activity", "meal", "sleep"].includes(categoryName)) {
    return categoryName;
  }

  const categoryInfo = customCategories.find(
    ({ category }) => category === categoryName,
  );

  if (!categoryInfo) {
    return null;
  }

  return categoryInfo.categoryType;
}

async function postComment(req, res, next) {
  const { creator, userId } = req;
  const { category, ratingId } = req.params;
  const { content } = req.body;
  const date = new Date(req.body.date);
  const categoryType = getCategoryType(category, creator.customCategories);
  const modelName = capitalize(categoryType);
  const categoryNameInDb = categoryModelName[categoryType];

  try {
    if (req.accessLevel === ACCESS_LEVELS.GUEST) {
      throw createError(UNAUTHORIZED);
    }

    if (!mongoose.Types.ObjectId.isValid(ratingId)) {
      throw createError(NOT_FOUND);
    }

    if (!categoryType) {
      throw createError(BAD_REQUEST, ERROR.CATEGORY_NOT_FOUND);
    }

    const invalidValues = validateBody([
      [content, isValidText],
      [date, isValidDate],
    ]);

    if (invalidValues.length) {
      throw createError(BAD_REQUEST, invalidValues + ERROR.INVALID_VALUE);
    }

    const newComment = await Comment.create({
      category: categoryNameInDb,
      ratingId,
      creator: userId,
      date,
      content,
    });

    const commentId = newComment._id;
    const updatedRating = await RatingModels[modelName]
      .findByIdAndUpdate(ratingId, { $push: { comments: commentId } }).lean();

    if (!updatedRating) {
      throw createError(NOT_FOUND);
    }

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

async function patchComment(req, res, next) {
  const { creator, userId } = req;
  const { category, ratingId, id } = req.params;
  const { content } = req.body;
  const date = new Date(req.body.date);
  const categoryType = getCategoryType(category, creator.customCategories);

  try {
    if (req.accessLevel === ACCESS_LEVELS.GUEST) {
      throw createError(UNAUTHORIZED);
    }

    if (!mongoose.Types.ObjectId.isValid(ratingId)) {
      throw createError(NOT_FOUND);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(NOT_FOUND);
    }

    if (!categoryType) {
      throw createError(BAD_REQUEST, ERROR.COMMENT_NOT_EXIST);
    }

    const invalidValues = validateBody([
      [content, isValidText],
      [date, isValidDate],
    ]);

    if (invalidValues.length) {
      throw createError(BAD_REQUEST, invalidValues + ERROR.INVALID_VALUE);
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      throw createError(NOT_FOUND, ERROR.COMMENT_NOT_EXIST);
    }

    if (comment.creator.toString() !== userId) {
      throw createError(UNAUTHORIZED);
    }

    await comment.updateOne({ $set: { date, content } });

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req, res, next) {
  const { creator, userId } = req;
  const { category, ratingId, id } = req.params;
  const categoryType = getCategoryType(category, creator.customCategories);
  const modelName = capitalize(categoryType);

  try {
    if (req.accessLevel === ACCESS_LEVELS.GUEST) {
      throw createError(UNAUTHORIZED);
    }

    if (!mongoose.Types.ObjectId.isValid(ratingId)) {
      throw createError(NOT_FOUND);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(NOT_FOUND);
    }

    if (!categoryType) {
      throw createError(BAD_REQUEST, ERROR.CATEGORY_NOT_FOUND);
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      throw createError(NOT_FOUND, ERROR.COMMENT_NOT_EXIST);
    }

    if (comment.creator.toString() !== userId && creator.id !== userId ) {
      throw createError(UNAUTHORIZED);
    }

    await comment.deleteOne();

    const updated = await RatingModels[modelName].findByIdAndUpdate(ratingId,
      { $pull: { comments: id } }).lean();

    if (!updated) {
      throw createError(NOT_FOUND, ERROR.COMMENT_NOT_EXIST);
    }

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

module.exports = { postComment, patchComment, deleteComment };
