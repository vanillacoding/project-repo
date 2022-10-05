const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { getAlarmTime } = require("../controllers/user.controller");

router.get("/", verifyToken, getAlarmTime);

module.exports = router;
