const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");

const { goalsValidation } = require("../validations");
const { goalsController } = require("../controllers");

router.route("/date").get(goalsController.getGoalsByDate);

router
  .route("/:goalId")
  .put(checkSchema(goalsValidation.updateGoal), goalsController.updateGoal)
  .delete(checkSchema(goalsValidation.paramsGoalId), goalsController.deleteGoal);

module.exports = router;
