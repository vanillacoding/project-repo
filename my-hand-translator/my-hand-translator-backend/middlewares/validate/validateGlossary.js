const { GLOSSARY } = require("../../constants/error");

const createHttpError = require("../../utils/createHttpError");

const validateGlossary = (req, res, next) => {
  const { glossary } = req.body;

  try {
    if (!glossary) {
      throw createHttpError(502, GLOSSARY.NO_GLOSSARY, 3000);
    }

    const isValidGlossaryTargetLength = Object.values(glossary).every(
      ({ length }) => length > 0 && length <= 1000,
    );

    if (!isValidGlossaryTargetLength) {
      throw createHttpError(502, GLOSSARY.INVALID_GLOSSARY_TARGET_LENGTH, 3001);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = validateGlossary;
