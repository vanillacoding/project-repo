const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const validateAlarmTime = require("../middlewares/validateAlarmTime");
const validateInformation = require("../middlewares/validateInformation");

const {
  getInformation,
  updateAlarmTime,
  updateInformation,
} = require("../controllers/setting.controller");

router.get("/information", verifyToken, getInformation);
router.put("/information", verifyToken, validateInformation, updateInformation);
router.put("/alarm-time", verifyToken, validateAlarmTime, updateAlarmTime);

module.exports = router;
