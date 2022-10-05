const createError = require("http-errors");
const mongoose = require("mongoose");

const Sleep = require("../../models/Sleep");
const Comment = require("../../models/Comment");
const { ERROR } = require("../../constants/messages");
const { OK, BAD_REQUEST, NOT_FOUND } = require("../../constants/statusCodes");

const {
  validateBody, isValidHeartCount, isValidText,
} = require("../utils/validations");

async function getSleep(req, res, next) {
  try {
    const { userId } = req;

    const searchResult = await Sleep.aggregate([
      {
        $match: {
          creator: mongoose.Types.ObjectId(userId),
        },
      }, {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          sum: { $sum: "$duration" },
          avg: { $avg: "$rating.heartCount" },
          oid: {
            $push: "$_id",
          },
        },
      }, {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.status(OK);
    res.json({
      result: "ok",
      data: searchResult,
    });
  } catch (err) {
    next(err);
  }
}

async function getSleepDetail(req, res, next) {
  try {
    const sleepId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(sleepId)) {
      throw createError(NOT_FOUND);
    }

    const sleep = await Sleep.findById(sleepId).populate({
      path: "comments",
      populate: {
        path: "creator",
        select: "profileUrl name",
      },
    });

    if (!sleep) {
      throw createError(NOT_FOUND, ERROR.SESSION_NOT_FOUND);
    }

    res.status(OK);
    res.json({ result: "ok", data: sleep });
  } catch (err) {
    next(err);
  }
}

async function patchSleepDetail(req, res, next) {
  try {
    const sleepId = req.params.id;
    const { heartCount, text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(sleepId)) {
      throw createError(NOT_FOUND);
    }

    const invalidValues = validateBody([
      [heartCount, isValidHeartCount], [text, isValidText],
    ]);

    if (invalidValues.length) {
      throw createError(BAD_REQUEST, invalidValues + ERROR.INVALID_VALUE);
    }

    const sleep = await Sleep.findByIdAndUpdate(sleepId, {
      rating: { heartCount, text },
    });

    if (!sleep) {
      throw createError(NOT_FOUND, ERROR.SESSION_NOT_FOUND);
    }

    res.status(OK);
    res.json({ result: "ok", sleep });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errPaths = Object.keys(err.errors).join(", ");

      return next(createError(BAD_REQUEST, errPaths + ERROR.INVALID_VALUE));
    }

    next(err);
  }
}

async function deleteSleepDetail(req, res, next) {
  try {
    const sleepId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(sleepId)) {
      throw createError(NOT_FOUND);
    }

    const sleep = await Sleep.findByIdAndRemove(sleepId);

    if (!sleep) {
      throw createError(NOT_FOUND, ERROR.SESSION_NOT_FOUND);
    }

    const deletedDoc = await Comment.deleteMany({ ratingId: sleep._id });

    if (deletedDoc === "Not Found") {
      throw createError(NOT_FOUND, ERROR.INVALID_SLEEP_DATA);
    }

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getSleep,
  getSleepDetail,
  patchSleepDetail,
  deleteSleepDetail,
};
