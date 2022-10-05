const mongoose = require("mongoose");

const createHttpError = require("../../utils/createHttpError");
const { GLOSSARY } = require("../../constants/error");

const validateGlossaryId = (req, res, next) => {
  const { glossary_id: glossaryId } = req.params;

  try {
    if (!glossaryId) {
      throw createHttpError(502, GLOSSARY.NO_ID, 3002);
    }

    if (!mongoose.isValidObjectId(glossaryId)) {
      throw createHttpError(502, GLOSSARY.INVALID_ID, 3003);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = validateGlossaryId;
