const createError = require("http-errors");
const { MESSAGE } = require("../constants");

const validateId = require("uuid-validate");

const validatePrescriptionIdParams = (req, res, next) => {
  const { prescriptionId } = req.params;

  try {
    if (validateId(prescriptionId)) {
      return next();
    }

    throw createError(400, MESSAGE.INVALID_PRESCRIPTION_ID);
  } catch (error) {
    return next(error);
  }
};

module.exports = validatePrescriptionIdParams;
