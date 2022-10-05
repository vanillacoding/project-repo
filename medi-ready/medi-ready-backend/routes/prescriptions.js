const express = require("express");
const router = express.Router();

const {
  updateAlarm,
  postPrescription,
  deletePrescription,
  getPrescriptionList,
} = require("../controllers/prescription.controller");

const { verifyToken } = require("../middlewares/verifyToken");

const validatePrescription = require("../middlewares/validatePrescription");
const validatePrescriptionIdParams = require("../middlewares/validatePrescriptionIdParams");

router.get("/", verifyToken, getPrescriptionList);

router.post("/new", verifyToken, validatePrescription, postPrescription);

router.put("/:prescriptionId", verifyToken, validatePrescriptionIdParams, updateAlarm);

router.delete("/:prescriptionId", verifyToken, validatePrescriptionIdParams, deletePrescription);

module.exports = router;
