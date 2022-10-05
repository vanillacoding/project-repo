const {
  User,
  Alarm,
  Queue,
  Patient,
  Medicine,
  Pharmacist,
  DoseHistory,
  Prescription,
  MedicineDetail,
} = require("../models");

const save = async () => {
  const fs = require("fs");

  const userRawData = fs.readFileSync("./models/mockup/userMockup.json");
  const alarmRawData = fs.readFileSync("./models/mockup/alarmMockup.json");
  const queueRawData = fs.readFileSync("./models/mockup/queueMockup.json");
  const patientRawData = fs.readFileSync("./models/mockup/patientMockup.json");
  const medicineRawData = fs.readFileSync("./models/mockup/medicineMockup.json");
  const pharmacistRawData = fs.readFileSync("./models/mockup/pharmacistMockup.json");
  const doseHistoryRawData = fs.readFileSync("./models/mockup/doseHistoryMockup.json");
  const prescriptionRawData = fs.readFileSync("./models/mockup/prescriptionMockup.json");
  const medicineDetailRawData = fs.readFileSync("./models/mockup/medicineDetailMockup.json");

  const userData = JSON.parse(userRawData);
  const alarmData = JSON.parse(alarmRawData);
  const queueData = JSON.parse(queueRawData);
  const patientData = JSON.parse(patientRawData);
  const medicineData = JSON.parse(medicineRawData);
  const pharmacistData = JSON.parse(pharmacistRawData);
  const doseHistoryData = JSON.parse(doseHistoryRawData);
  const prescriptionData = JSON.parse(prescriptionRawData);
  const medicineDetailData = JSON.parse(medicineDetailRawData);

  try {
    for (let i = 0; i < userData.length; i++) {
      await User.create(userData[i]);
      console.log(i + 1, userData.length);
    }

    for (let i = 0; i < pharmacistData.length; i++) {
      await Pharmacist.create(pharmacistData[i]);
      console.log(i + 1, pharmacistData.length);
    }

    for (let i = 0; i < queueData.length; i++) {
      await Queue.create(queueData[i]);
      console.log(i + 1, queueData.length);
    }

    for (let i = 0; i < patientData.length; i++) {
      await Patient.create(patientData[i]);
      console.log(i + 1, patientData.length);
    }

    for (let i = 0; i < alarmData.length; i++) {
      await Alarm.create(alarmData[i]);
      console.log(i + 1, alarmData.length);
    }

    for (let i = 0; i < prescriptionData.length; i++) {
      await Prescription.create(prescriptionData[i]);
      console.log(i + 1, prescriptionData.length);
    }

    for (let i = 0; i < doseHistoryData.length; i++) {
      await DoseHistory.create(doseHistoryData[i]);
      console.log(i + 1, doseHistoryData.length);
    }

    for (let i = 0; i < medicineDetailData.length; i++) {
      await MedicineDetail.create(medicineDetailData[i]);
      console.log(i + 1, medicineDetailData.length);
    }

    for (let i = 0; i < medicineData.length; i++) {
      await Medicine.create(medicineData[i]);
      console.log(i + 1, medicineData.length);
    }

    console.log("mockup successfully entered into database");
  } catch (error) {
    console.error(error);
  }
};

save();
