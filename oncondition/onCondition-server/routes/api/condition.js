const express = require("express");
const router = express.Router();
const conditionController = require("../controller/condition");

router.get("/", conditionController.getCondition);

module.exports = router;
