const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");

const { schedulesValidation } = require("../validations");
const { schedulesController } = require("../controllers");

router
  .route("/:scheduleId")
  .put(checkSchema(schedulesValidation.updateSchedule), schedulesController.updateSchedule)
  .delete(checkSchema(schedulesValidation.paramsScheduleId), schedulesController.deleteSchedule);

module.exports = router;
