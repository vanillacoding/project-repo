const express = require("express");
const router = express.Router();

const auth = require("./auth");
const queue = require("./queue");
const settings = require("./settings");
const alarmTime = require("./alarmTime");
const medicines = require("./medicines");
const doseHistory = require("./doseHistory");
const notification = require("./notification");
const prescriptions = require("./prescriptions");

router.use("/auth", auth);
router.use("/queue", queue);
router.use("/settings", settings);
router.use("/medicines", medicines);
router.use("/alarm-time", alarmTime);
router.use("/doseHistory", doseHistory);
router.use("/notification", notification);
router.use("/prescriptions", prescriptions);

module.exports = router;
