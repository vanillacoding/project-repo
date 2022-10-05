const Goals = require("../models/Goals");
const createError = require("http-errors");

const { NOT_GOALS } = require("../constant/errorMessage/goals");
const Milestones = require("../models/Milestones");

const getGoalsByDate = async (startDate, endDate) => {
  const goals = await Goals.find({
    "start.dateTime": {
      $gte: startDate,
      $lt: endDate,
    },
  }).populate("milestone");

  return goals;
};

const createGoal = async (milestoneId, goalBody) => {
  const milestone = await Milestones.findById(milestoneId).exec();
  const goals = await Goals.create({
    ...goalBody,
    milestone: milestoneId,
  });

  milestone.runningTimes.push(goals._id);
  await milestone.save();
  await goals.populate("milestone");

  return goals;
};

const updateGoal = async (goalId, goalBody) => {
  const goal = await Goals.findByIdAndUpdate(goalId, goalBody, { new: true }).lean().exec();

  if (!goal) {
    throw createError(400, NOT_GOALS);
  }

  return goal;
};

const deleteGoal = async (goalId) => {
  return Goals.findByIdAndUpdate(goalId, { isDeleted: true }).lean().exec();
};

module.exports = {
  getGoalsByDate,
  createGoal,
  updateGoal,
  deleteGoal,
};
