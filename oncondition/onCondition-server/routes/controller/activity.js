const createError = require("http-errors");
const mongoose = require("mongoose");

const Activity = require("../../models/Activity");
const Step = require("../../models/Step");
const Comment = require("../../models/Comment");
const defaultOption = require("../../config/paginateOption");
const ACCESS_LEVELS = require("../../constants/accessLevels");
const { ERROR } = require("../../constants/messages");
const {
  OK, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED,
} = require("../../constants/statusCodes");

const {
  validateBody, isValidHeartCount, isValidText,
} = require("../utils/validations");

async function getActivity(req, res, next) {
  try {
    const { userId } = req;
    const { page } = req.headers;
    const pagenateOptions = { ...defaultOption };

    if (page) {
      pagenateOptions.page = page;
    }

    const result = await Activity.paginate( {
      creator: mongoose.Types.ObjectId(userId),
    }, pagenateOptions);

    const stepData = await Step.findOne( {
      creator: userId,
    });

    res.status(OK);
    res.json({
      result: "ok",
      data: {
        activities: result.docs,
        stepCount: stepData?.count || 0,
      },
      nextPage: result.nextPage,
      prevPage: result.prevPage,
    });
  } catch (err) {
    next(err);
  }
}

async function getActivityDetail(req, res, next) {
  try {
    const activityId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      throw createError(NOT_FOUND);
    }

    const activityData = await Activity.findById(activityId).populate({
      path: "comments",
      populate: {
        path: "creator",
        select: "profileUrl name",
      },
    });

    if (!activityData) {
      throw createError(NOT_FOUND, ERROR.SESSION_NOT_FOUND);
    }

    res.status(OK);
    res.json({ result: "ok", accessLevel: req.accessLevel, data: activityData });
  } catch (err) {
    next(err);
  }
}

async function patchActivityDetail(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const activityId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      throw createError(NOT_FOUND);
    }

    const { heartCount, text } = req.body;
    const invalidValues = validateBody([
      [heartCount, isValidHeartCount], [text, isValidText],
    ]);

    if (invalidValues.length) {
      throw createError(BAD_REQUEST, invalidValues + ERROR.INVALID_VALUE);
    }

    const activity = await Activity.findByIdAndUpdate(activityId, {
      rating: { heartCount, text },
    });

    if (!activity) {
      throw createError(NOT_FOUND, ERROR.SESSION_NOT_FOUND);
    }

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errPaths = Object.keys(err.errors).join(", ");

      return next(createError(BAD_REQUEST, errPaths + ERROR.INVALID_VALUE));
    }

    next(err);
  }
}

async function deleteActivityDetail(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const activityId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      throw createError(NOT_FOUND);
    }

    const activity = await Activity.findByIdAndDelete(activityId);

    if (!activity) {
      throw createError(NOT_FOUND, ERROR.SESSION_NOT_FOUND);
    }

    const { _id } = activity;

    await Comment.deleteMany({ ratingId: _id });

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getActivity,
  getActivityDetail,
  patchActivityDetail,
  deleteActivityDetail,
};
