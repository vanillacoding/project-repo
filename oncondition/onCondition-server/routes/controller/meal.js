const createError = require("http-errors");
const mongoose = require("mongoose");
const s3 = require("../../config/AWS");

const Meal = require("../../models/Meal");
const Comment = require("../../models/Comment");
const defaultOption = require("../../config/paginateOption");
const { ERROR } = require("../../constants/messages");
const {
  OK, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED,
} = require("../../constants/statusCodes");
const ACCESS_LEVELS = require("../../constants/accessLevels");

const getImageUrl = require("../services/getImageUrl");
const {
  validateBody, isValidUrl, isValidHeartCount, isValidText, isValidDate,
} = require("../utils/validations");

async function getMeal(req, res, next) {
  try {
    const pagenateOptions = { ...defaultOption };

    const { userId } = req;
    const { page } = req.headers;

    if (page) {
      pagenateOptions.page = page;
    }

    const result = await Meal.paginate({ creator: userId }, pagenateOptions);

    res.status(OK);
    res.json({
      result: "ok",
      data: result.docs,
      nextPage: result.nextPage,
      prevPage: result.prevPage,
    });
  } catch (err) {
    next(err);
  }
}

async function postMeal(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const { image, heartCount, text } = req.body;
    const date = new Date(req.body.date);

    const invalidValues = validateBody([
      [heartCount, isValidHeartCount],
      [text, isValidText],
      [date, isValidDate],
    ]);

    if (invalidValues.length) {
      throw createError(BAD_REQUEST, invalidValues + ERROR.INVALID_VALUE);
    }

    const newMeal = {
      creator: req.userId,
      date,
      rating: { heartCount, text },
    };

    if (image) {
      newMeal.url = await getImageUrl(image);
    }

    const data = await Meal.create(newMeal);

    res.status(OK);
    res.json({ result: "ok", data });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errPaths = Object.keys(err.errors).join(", ");

      return next(createError(BAD_REQUEST, errPaths + ERROR.INVALID_VALUE));
    }

    next(err);
  }
}

async function getMealDetail(req, res, next) {
  try {
    const mealId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
      throw createError(NOT_FOUND);
    }

    const mealData = await Meal.findById(mealId).populate({
      path: "comments",
      populate: {
        path: "creator",
        select: "profileUrl name",
      },
    });

    if (!mealData) {
      throw createError(NOT_FOUND);
    }

    res.status(OK);
    res.json({ result: "ok", accessLevel: req.accessLevel, data: mealData });
  } catch (err) {
    next(err);
  }
}

async function patchMealDetail(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const mealId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
      throw createError(NOT_FOUND);
    }

    const { url, heartCount, text } = req.body;
    const date = new Date(req.body.date);

    const invalidValues = validateBody([
      [url, isValidUrl],
      [heartCount, isValidHeartCount],
      [text, isValidText],
      [date, isValidDate],
    ]);

    if (invalidValues.length) {
      throw createError(BAD_REQUEST, invalidValues + ERROR.INVALID_VALUE);
    }

    const data = await Meal.findOneAndUpdate(
      { _id: mealId, creator: req.userId },
      { date, rating: { heartCount, text } },
      { new: true },
    );

    if (!data) {
      throw createError(NOT_FOUND);
    }

    res.status(OK);
    res.json({ result: "ok", data });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errPaths = Object.keys(err.errors).join(", ");

      return next(createError(BAD_REQUEST, errPaths + ERROR.INVALID_VALUE));
    }

    next(err);
  }
}

async function deleteMealDetail(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const mealId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
      throw createError(NOT_FOUND);
    }

    const meal = await Meal.findOne({
      _id: mealId,
      creator: req.userId,
    });

    if (!meal) {
      throw createError(NOT_FOUND);
    }

    if (meal.url) {
      const imageKey = meal.url.split("/album1/").pop();

      await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: `album1/${imageKey}`,
      }).promise();
    }

    await meal.deleteOne();
    await Comment.deleteMany({ ratingId: meal._id });

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMeal, postMeal, getMealDetail, patchMealDetail, deleteMealDetail,
};
