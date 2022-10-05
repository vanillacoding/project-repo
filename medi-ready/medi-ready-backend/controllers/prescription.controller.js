const createError = require("http-errors");

const { NUMBER, USER_TYPE } = require("../constants");
const userService = require("../services/user.service");
const historyService = require("../services/history.service");
const medicineService = require("../services/medicine.service");
const prescriptionService = require("../services/prescription.service");

exports.postPrescription = async (req, res, next) => {
  const userId = req.userInfo.user_id;
  const { medicines, duration, patient_id, description, doseTimes } = req.body;

  try {
    const pharmacistId = await userService.findPharmacistId(userId);

    const prescriptionId = await prescriptionService.create(
      patient_id,
      pharmacistId,
      duration || 3,
      description,
      doseTimes
    );

    Promise.all([
      userService.dequeue(patient_id),
      userService.registerPushNotification(patient_id, duration, doseTimes),
      medicineService.increaseFrequency(medicines),
      medicineService.createMany(medicines, prescriptionId),
      historyService.createDoseHistory(patient_id, prescriptionId, duration),
    ])
      .then(() => {
        return res.status(200).json({ result: "success" });
      })
      .catch(() => {
        throw createError(500, "prescription details are invalid");
      });
  } catch (error) {
    next(error);
  }
};

exports.getPrescriptionList = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { user_id } = req.userInfo;

    if (userInfo.user_type === USER_TYPE.PATIENT) {
      const prescriptions = await prescriptionService.getPatientPrescriptionList(user_id);

      return res.status(200).json({ result: "success", data: prescriptions });
    }

    if (userInfo.user_type === USER_TYPE.PHARMACIST) {
      const page = parseInt(req.query.page, 10) || 0;

      const prescriptions = await prescriptionService.getPharmacistPrescriptionList(userInfo, page);
      const hasMoreData = prescriptions.length === NUMBER.PRESCRIPTION_PER_PAGE;

      res.status(200).json({ result: "success", prescriptions, hasMoreData });
    }
  } catch (error) {
    next(error);
  }
};

exports.getPrescriptionDetails = async (req, res, next) => {
  const { prescriptionId } = req.params;

  try {
    const details = await prescriptionService.getDetails(prescriptionId);

    res.status(200).json({ result: "success", data: details });
  } catch (error) {
    res.json({ result: "fail" });
  }
};

exports.updateAlarm = async (req, res, next) => {
  const { prescriptionId } = req.params;

  try {
    await prescriptionService.toggleAlarm(prescriptionId);

    res.status(200).json({ result: "success" });
  } catch (error) {
    res.json({ result: "fail" });
  }
};

exports.deletePrescription = async (req, res, next) => {
  const { prescriptionId } = req.params;

  try {
    await prescriptionService.toggleIsDeleted(prescriptionId);

    res.status(200).json({ result: "success" });
  } catch (error) {
    res.json({ result: "fail" });
  }
};
