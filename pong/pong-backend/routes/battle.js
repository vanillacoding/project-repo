const express = require("express");
const router = express.Router();
const battleController = require("../controller/battle.controller");
const verifyToken = require("../middleware/verifyToken");

router.patch("/", verifyToken, battleController.patch);

module.exports = router;
