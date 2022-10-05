const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { updateDoseHistory } = require("../controllers/history.controller");
const validateDoseHistory = require("../middlewares/validateDoseHistory");

router.put("/:doseHistoryId", verifyToken, validateDoseHistory, updateDoseHistory);

module.exports = router;
