const createHttpError = require("../utils/createHttpError");

const Translation = require("../models/Translation");
const { SERVER } = require("../constants/error");
const { RESULT } = require("../constants/responseMessages");

const byUserId = async (req, res, next) => {
  const { page, limit = 5 } = req.query;
  const { user_id: userId } = req.params;

  try {
    const translations = await Translation.find({ user: userId })
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    return res.json({
      result: RESULT.OK,
      data: translations,
    });
  } catch (error) {
    return next(createHttpError(500, SERVER.INTERNAL_ERROR, 4010));
  }
};

const createByUserId = async (req, res, next) => {
  const { user_id: userId } = req.params;
  const { nanoId, origin, translated, url, glossary, createdAt } = req.body;

  try {
    await Translation({
      nanoId,
      user: userId,
      origin,
      translated,
      url,
      glossary,
      createdAt,
    }).save();

    return res.json({ result: RESULT.OK });
  } catch (error) {
    return next(createHttpError(500, SERVER.INTERNAL_ERROR, 4010));
  }
};

const synchronize = async (req, res, next) => {
  const { email, translations } = req.body;
  const bulkData = [];

  for (let i = 0; i < translations.length; i += 1) {
    const translation = translations[i];

    bulkData.push({
      updateOne: {
        filter: { user: email, origin: translation.origin },
        update: {
          user: email,
          ...translation,
        },
        upsert: true,
      },
    });
  }

  try {
    await Translation.bulkWrite(bulkData);

    return res.json({ result: RESULT.OK });
  } catch (error) {
    return next(createHttpError(500, SERVER.INTERNAL_ERROR, 4010));
  }
};

const remove = async (req, res, next) => {
  const { translation_id: translationId } = req.params;

  try {
    await Translation.findByIdAndDelete(translationId);

    return res.json({ result: RESULT.OK });
  } catch (error) {
    return next(createHttpError(500, SERVER.INTERNAL_ERROR));
  }
};

module.exports = {
  byUserId,
  createByUserId,
  synchronize,
  remove,
};
