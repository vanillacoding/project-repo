const catchAsync = require("../utils/catchAsync");
const { goalsService } = require("../services");

const getGoalsByDate = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const goals = await goalsService.getGoalsByDate(startDate, endDate);

  res.json({
    result: "ok",
    runningTimes: goals,
  });
});

const createGoal = catchAsync(async (req, res) => {
  const { milestoneId } = req.params;

  const goal = await goalsService.createGoal(milestoneId, req.body);

  res.json({
    result: "ok",
    data: goal,
  });
});

const updateGoal = catchAsync(async (req, res) => {
  const { goalId } = req.params;

  const goal = await goalsService.updateGoal(goalId, req.body);

  res.json({
    result: "ok",
    data: goal,
  });
});

const deleteGoal = catchAsync(async (req, res) => {
  const { goalId } = req.params;

  await goalsService.deleteGoal(goalId);

  res.json({
    result: "ok",
  });
});

module.exports = {
  getGoalsByDate,
  createGoal,
  updateGoal,
  deleteGoal,
};
