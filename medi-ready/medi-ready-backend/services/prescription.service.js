const { NUMBER } = require("../constants");
const {
  User,
  Patient,
  Medicine,
  Pharmacist,
  DoseHistory,
  Prescription,
  MedicineDetail,
} = require("../models");
const userService = require("./user.service");

exports.getPatientPrescriptionList = async (userId) => {
  try {
    const patientId = await userService.findPatientId(userId);

    const prescriptions = await Prescription.findAll({
      where: {
        fk_patient_id: patientId,
      },
      include: [
        { model: DoseHistory },
        {
          model: Pharmacist,
          include: [
            {
              model: User,
            },
          ],
        },
        {
          model: Medicine,
          include: [{ model: MedicineDetail }],
        },
      ],
      order: [[DoseHistory, "date", "ASC"]],
    });

    return prescriptions;
  } catch (error) {
    throw error;
  }
};

exports.getPharmacistPrescriptionList = async (userInfo, page) => {
  try {
    const userId = userInfo.user_id;
    const pharmacistId = await userService.findPharmacistId(userId);

    const prescriptions = await Prescription.findAll({
      where: { fk_pharmacist_id: pharmacistId },
      include: [
        { model: Medicine, include: [{ model: MedicineDetail }] },
        { model: Pharmacist },
        { model: DoseHistory },
        { model: Patient, include: [{ model: User }] },
      ],
      order: [[DoseHistory, "date", "DESC"]],
      limit: NUMBER.PRESCRIPTION_PER_PAGE,
      offset: NUMBER.PRESCRIPTION_PER_PAGE * page,
    });

    return prescriptions;
  } catch (error) {
    throw error;
  }
};

exports.getDetails = async (id) => {
  try {
    const details = Prescription.findOne({
      where: { prescription_id: id },
      include: [
        { model: DoseHistory },
        { model: Pharmacist, include: [{ model: User }] },
        { model: Patient, include: [{ model: User }] },
        {
          model: Medicine,
          include: [{ model: MedicineDetail }],
        },
      ],
    });

    return details;
  } catch (error) {
    throw error;
  }
};

exports.create = async (patientId, pharmacistId, duration, description, doseTimes) => {
  const DAY = 86400000;
  const expirationDate = new Date().getTime() + duration * DAY;

  const prescriptionDetails = {
    is_alarm_on: true,
    fk_patient_id: patientId,
    fk_pharmacist_id: pharmacistId,
    expiration_date: expirationDate,
    description,
    ...doseTimes,
  };

  try {
    const prescription = await Prescription.create(prescriptionDetails);
    const { prescription_id } = prescription.dataValues;

    return prescription_id;
  } catch (error) {
    throw error;
  }
};

exports.toggleAlarm = async (id) => {
  try {
    const prescription = await Prescription.findOne({
      where: { prescription_id: id },
    });

    const previousValue = prescription.dataValues.is_alarm_on;

    await Prescription.update(
      {
        is_alarm_on: !previousValue,
      },
      {
        where: {
          prescription_id: id,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.toggleIsDeleted = async (id) => {
  try {
    const prescription = await Prescription.findOne({
      where: { prescription_id: id },
    });

    const previousValue = prescription.dataValues.is_deleted;

    await Prescription.update(
      {
        is_deleted: !previousValue,
      },
      {
        where: {
          prescription_id: id,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
