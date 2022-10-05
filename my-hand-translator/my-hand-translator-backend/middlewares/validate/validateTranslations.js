const mongoose = require("mongoose");

const { GLOSSARY, TRANSLATIONS } = require("../../constants/error");
const createHttpError = require("../../utils/createHttpError");
const isValid = require("../../utils/isValid");

module.exports.validateTranslation = (req, res, next) => {
  const { nanoId, createdAt, origin, translated, url } = req.body;

  try {
    if (!isValid.string(origin)) {
      throw createHttpError(502, TRANSLATIONS.NO_TEXT, 4001);
    }

    if (!isValid.string(translated)) {
      throw createHttpError(502, TRANSLATIONS.NO_TRANSLATED, 4002);
    }

    if (!isValid.string(nanoId)) {
      throw createHttpError(502, TRANSLATIONS.NO_NANO_ID, 4011);
    }

    if (!isValid.url(url)) {
      throw createHttpError(502, TRANSLATIONS.NO_URL, 4003);
    }

    if (!isValid.ISOString(createdAt)) {
      throw createHttpError(502, TRANSLATIONS.NO_CREATED_AT, 4012);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports.validateTranslations = (req, res, next) => {
  const { translations } = req.body;

  for (let i = 0; i < translations.length; i += 1) {
    const translation = translations[i];
    const { nanoId, createdAt, origin, translated, url, glossary } =
      translation;

    try {
      if (!isValid.string(origin)) {
        throw createHttpError(502, TRANSLATIONS.NO_TEXT, 4001);
      }

      if (!isValid.string(translated)) {
        throw createHttpError(502, TRANSLATIONS.NO_TRANSLATED, 4002);
      }

      if (!isValid.string(nanoId)) {
        throw createHttpError(502, TRANSLATIONS.NO_NANO_ID, 4011);
      }

      if (!isValid.url(url)) {
        throw createHttpError(502, TRANSLATIONS.NO_URL, 4003);
      }

      if (!isValid.ISOString(createdAt)) {
        throw createHttpError(502, TRANSLATIONS.NO_CREATED_AT, 4012);
      }

      if (!glossary) {
        throw createHttpError(502, GLOSSARY.NO_GLOSSARY, 3000);
      }

      const isValidGlossaryTargetLength = Object.values(glossary).every(
        ({ length }) => length > 0 && length <= 1000,
      );

      if (!isValidGlossaryTargetLength) {
        throw createHttpError(
          502,
          GLOSSARY.INVALID_GLOSSARY_TARGET_LENGTH,
          3001,
        );
      }
    } catch (error) {
      return next(error);
    }
  }

  return next();
};

module.exports.validateTranslationId = (req, res, next) => {
  const { translation_id: translationId } = req.params;
  try {
    if (!translationId) {
      throw createHttpError(502, TRANSLATIONS.NO_ID, 4008);
    }

    if (!mongoose.isValidObjectId(translationId)) {
      throw createHttpError(502, TRANSLATIONS.INVALID_TRANSLATED_ID, 4007);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};
