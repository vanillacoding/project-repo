const createError = require("http-errors");
const mongoose = require("mongoose");

const Grid = require("../../models/CustomGrid");
const Comment = require("../../models/Comment");
const ACCESS_LEVELS = require("../../constants/accessLevels");
const { ERROR } = require("../../constants/messages");
const {
  OK, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED,
} = require("../../constants/statusCodes");

const {
  validateBody, isValidHeartCount, isValidText, isValidDate,
} = require("../utils/validations");
const CustomGrid = require("../../models/CustomGrid");

async function getGrid(req, res, next) {
  if (req.categoryType !== "grid") {
    return next();
  }

  const contentPerPage = 30;
  try {
    const { userId } = req;
    const { category: categoryName } = req.params;
    const { page } = req.headers;

    const pagenateOptions = {
      limit: contentPerPage,
      sort: { date: 1 },
    };

    if (page !== "last") {
      pagenateOptions.page = page;
    } else {
      const documentsCount = await CustomGrid.count(
        {
          creator: userId,
          category: categoryName,
        },
      );

      const lastPage = Math.ceil(documentsCount / contentPerPage);
      pagenateOptions.page = lastPage;
    }

    const result = await CustomGrid.paginate(
      { creator: userId, category: categoryName }, pagenateOptions,
    );

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

async function postGrid(req, res, next) {
  if (req.categoryType !== "grid") {
    return next();
  }

  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const { userId } = req;
    const { category: categoryName } = req.params;

    const { heartCount, text } = req.body;
    const date = new Date(req.body.date);

    const invalidValues = validateBody([
      [heartCount, isValidHeartCount],
      [text, isValidText],
      [date, isValidDate],
    ]);

    if (invalidValues.length) {
      throw createError(BAD_REQUEST, invalidValues + ERROR.INVALID_VALUE);
    }

    const newGrid = {
      creator: userId,
      date,
      rating: { heartCount, text },
      category: categoryName,
    };

    const data = await Grid.create(newGrid);

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

async function getGridDetail(req, res, next) {
  if (req.categoryType !== "grid") {
    return next();
  }

  try {
    const gridId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(gridId)) {
      throw createError(NOT_FOUND);
    }

    const gridData = await Grid.findById(gridId).populate([
      {
        path: "creator",
        select: "uid",
      },
      {
        path: "comments",
        populate: {
          path: "creator",
          select: "profileUrl name",
        },
      },
    ]);

    if (!gridData) {
      throw createError(NOT_FOUND);
    }

    res.status(OK);
    res.json({
      result: "ok", accessLevel: req.accessLevel, data: gridData,
    });
  } catch (err) {
    next(err);
  }
}

async function patchGridDetail(req, res, next) {
  if (req.categoryType !== "grid") {
    return next();
  }

  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const { userId } = req;
    const gridId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(gridId)) {
      throw createError(NOT_FOUND);
    }

    const { heartCount, text } = req.body;
    const date = new Date(req.body.date);

    const invalidValues = validateBody([
      [heartCount, isValidHeartCount],
      [text, isValidText],
      [date, isValidDate],
    ]);

    if (invalidValues.length) {
      throw createError(BAD_REQUEST, invalidValues + ERROR.INVALID_VALUE);
    }

    const data = await Grid.findOneAndUpdate(
      { _id: gridId, creator: userId },
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

async function deleteGridDetail(req, res, next) {
  if (req.categoryType !== "grid") {
    return next();
  }

  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const { userId } = req;
    const gridId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(gridId)) {
      throw createError(NOT_FOUND);
    }

    const grid = await Grid.findOneAndDelete({ _id: gridId, creator: userId });

    if (!grid) {
      throw createError(NOT_FOUND);
    }

    await Comment.deleteMany({ ratingId: grid._id });

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getGrid,
  postGrid,
  getGridDetail,
  patchGridDetail,
  deleteGridDetail,
};
