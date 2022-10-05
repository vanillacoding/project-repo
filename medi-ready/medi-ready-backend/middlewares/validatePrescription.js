const createError = require("http-errors");
const isValid = require("../utils/isValid");

const { MESSAGE } = require("../constants");

const validatePrescription = (req, res, next) => {
  const { medicines, duration, patient_id, description, doseTimes } = req.body;

  try {
    if (
      isValid.duration(duration) &&
      isValid.doseTimes(doseTimes) &&
      isValid.medicines(medicines) &&
      isValid.input(description, patient_id)
    ) {
      return next();
    }

    throw createError(400, MESSAGE.INVALID_PRESCRIPTION_DATA);
  } catch (error) {
    return next(error);
  }
};

module.exports = validatePrescription;
