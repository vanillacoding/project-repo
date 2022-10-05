const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");

const { milestonesValidation, goalsValidation } = require("../validations");
const { milestonesController, goalsController } = require("../controllers");

router
  .route("/:milestoneId")
  .put(checkSchema(milestonesValidation.updateMilestone), milestonesController.updateMilestone)
  .delete(
    checkSchema(milestonesValidation.paramsMilestoneId),
    milestonesController.deleteMilestone,
  );

router
  .route("/:milestoneId/goals")
  .post(checkSchema(goalsValidation.createGoal), goalsController.createGoal);

module.exports = router;
