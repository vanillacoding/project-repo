const createError = require("http-errors");
const { MESSAGE } = require("../constants");
const isValid = require("../utils/isValid");

const medicineService = require("../services/medicine.service");

exports.getMedicine = async (req, res, next) => {
  const { name } = req.query;

  try {
    if (!isValid.input(name)) {
      throw createError(400, MESSAGE.INVALID_MEDICINE_NAME);
    }

    const medicine = await medicineService.getMedicineName(name);

    if (!medicine) {
      return res.status(200).json({ result: "fail", data: null });
    }

    res.status(200).json({ result: "success", data: medicine });
  } catch (error) {
    next(error);
  }
};

exports.getMedicines = async (req, res, next) => {
  const { search } = req.query;

  try {
    if (!isValid.input(search)) {
      throw createError(400, MESSAGE.INVALID_MEDICINE_NAME);
    }

    const medicines = await medicineService.getMedicineNames(search);

    if (!medicines) {
      return res.status(200).json({ result: "fail", data: null });
    }

    res.status(200).json({ result: "success", data: medicines.slice(0, 10) });
  } catch (error) {
    next(error);
  }
};
