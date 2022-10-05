const catchAsync = require("../utils/catchAsync");
const { usersService } = require("../services");

const signIn = catchAsync(async (req, res) => {
  const user = await usersService.createUser(req.body);

  res.json({
    result: "ok",
    data: user,
  });
});

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await usersService.getUser(userId);

  res.json({
    result: "ok",
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await usersService.updateUser(userId, req.body);

  res.json({
    result: "ok",
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await usersService.deleteUser(userId);

  res.json({
    result: "ok",
  });
});

const getSchedulesByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  const schedule = await usersService.getSchedulesByUserId(userId, date);

  res.json({
    result: "ok",
    data: schedule,
  });
});

const createSchedulesByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const schedule = await usersService.createSchedulesByUserId(userId, req.body);

  res.json({
    result: "ok",
    data: schedule,
  });
});

const getMilestonesByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  const milestone = await usersService.getMilestonesByUserId(userId, date);

  res.json({
    result: "ok",
    data: milestone,
  });
});

const createMilestonesByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const milestone = await usersService.createMilestonesByUserId(userId, req.body);

  res.json({
    result: "ok",
    data: milestone,
  });
});

module.exports = {
  signIn,
  getUser,
  updateUser,
  deleteUser,
  getSchedulesByUserId,
  createSchedulesByUserId,
  getMilestonesByUserId,
  createMilestonesByUserId,
};
