const express = require("express");
const router = express.Router();
const sleepController = require("../controller/sleep");

router.get("/", sleepController.getSleep);

router.get("/:id", sleepController.getSleepDetail);

router.patch("/:id", sleepController.patchSleepDetail);

router.delete("/:id", sleepController.deleteSleepDetail);

module.exports = router;
