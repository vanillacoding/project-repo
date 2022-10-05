const Translation = require("../models/Translation");
const createHttpError = require("../utils/createHttpError");
const { WORD } = require("../constants/error");

const DECIMAL_POINT = 2;
const PERCENTAGE = 100;
const SIMILARITY = 95;

const findSimilarTarget = (words, targets, similarity) => {
  if (!targets) {
    return null;
  }

  for (let i = 0; i < targets.length; i += 1) {
    const { origin } = targets[i];
    const includedRate = Math.floor(
      (words.length / origin.length).toFixed(DECIMAL_POINT) * PERCENTAGE,
    );

    if (includedRate >= similarity) {
      return targets[i];
    }
  }

  return null;
};

const checkTranslated = async (req, res, next) => {
  try {
    const { words } = req.query;

    if (!words) {
      throw createHttpError(400, WORD.NO_WORD, 5001);
    }

    const translations = await Translation.find({ origin: { $regex: words } })
      .lean()
      .exec();
    const translation = findSimilarTarget(words, translations, SIMILARITY);

    if (!translation) {
      return res.json({ result: "ok", data: null });
    }

    delete translation._id;

    return res.json({ result: "ok", data: translation });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkTranslated,
};
