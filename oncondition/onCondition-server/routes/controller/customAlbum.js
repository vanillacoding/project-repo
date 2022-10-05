const createError = require("http-errors");
const mongoose = require("mongoose");
const s3 = require("../../config/AWS");

const Album = require("../../models/CustomAlbum");
const Comment = require("../../models/Comment");
const defaultOption = require("../../config/paginateOption");
const ACCESS_LEVELS = require("../../constants/accessLevels");
const { ERROR } = require("../../constants/messages");
const {
  OK, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED,
} = require("../../constants/statusCodes");

const getImageUrl = require("../services/getImageUrl");
const {
  validateBody, isValidHeartCount, isValidText, isValidDate,
} = require("../utils/validations");

async function getAlbum(req, res, next) {
  try {
    const { userId } = req;
    const { category: categoryName } = req.params;
    const { page } = req.headers;

    const pagenateOptions = {
      ...defaultOption,
    };

    if (page) {
      pagenateOptions.page = page;
    }

    const result = await Album.paginate(
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

async function postAlbum(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const { userId } = req;
    const { category: categoryName } = req.params;
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

    const newAlbum = {
      creator: userId,
      date,
      rating: { heartCount, text },
      category: categoryName,
    };

    if (image) {
      newAlbum.url = await getImageUrl(image);
    }

    const data = await Album.create(newAlbum);

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

async function getAlbumDetail(req, res, next) {
  try {
    const albumId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(albumId)) {
      throw createError(NOT_FOUND);
    }

    const albumData = await Album.findById(albumId).populate([
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

    if (!albumData) {
      throw createError(NOT_FOUND);
    }

    res.status(OK);
    res.json({ result: "ok", accessLevel: req.accessLevel, data: albumData });
  } catch (err) {
    next(err);
  }
}

async function patchAlbumDetail(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const { userId } = req;
    const albumId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(albumId)) {
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

    const data = await Album.findOneAndUpdate(
      { _id: albumId, creator: userId },
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

async function deleteAlbumDetail(req, res, next) {
  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    const albumId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(albumId)) {
      throw createError(NOT_FOUND);
    }

    const album = await Album.findOne({
      _id: albumId,
      creator: req.userId,
    });

    if (!album) {
      throw createError(NOT_FOUND);
    }

    if (album.url) {
      const imageKey = album.url.split("/album1/").pop();

      await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: `album1/${imageKey}`,
      }).promise();
    }

    await album.deleteOne();
    await Comment.deleteMany({ ratingId: album._id });

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAlbum,
  postAlbum,
  getAlbumDetail,
  patchAlbumDetail,
  deleteAlbumDetail,
};
