const createError = require("http-errors");

const { Users, Schedules, Milestones } = require("../models");
const { NOT_SIGNED } = require("../constant/errorMessage/users");

const createUser = async (userBody) => {
  const user = await Users.findOne({ email: userBody.email }).populate("milestones");

  if (user) {
    user.mileStones = await Milestones.find({ userEmail: userBody.email });
    return user;
  }

  return Users.create(userBody);
};

const getUser = async (userId) => {
  const user = await Users.findById(userId).lean().exec();

  if (!user) {
    throw createError(400, NOT_SIGNED);
  }

  return user;
};

const updateUser = async (userId, userBody) => {
  const user = await Users.findOneAndUpdate({ email: userId }, userBody, { new: true })
    .lean()
    .exec();

  if (!user) {
    throw createError(400, NOT_SIGNED);
  }

  return user;
};

const deleteUser = async (userId) => {
  const user = await Users.findByIdAndDelete(userId).lean().exec();

  if (!user) {
    throw createError(400, NOT_SIGNED);
  }

  return user;
};

const getSchedulesByUserId = async (userId, date) => {
  const user = await Users.findById(userId).lean().exec();

  if (!user) {
    throw createError(400, NOT_SIGNED);
  }

  const schedulesDate = await Schedules.find({
    userId,
    start: { date: { $gte: new Date(date).toISOString() } },
  });

  return schedulesDate;
};

const createSchedulesByUserId = async (userId, scheduleBody) => {
  const user = await Users.findById(userId).lean().exec();

  if (!user) {
    throw createError(400, NOT_SIGNED);
  }

  return Schedules.create({
    userId,
    ...scheduleBody,
  });
};

const getMilestonesByUserId = async (userId) => {
  const user = await Users.findById(userId).lean().exec();

  if (!user) {
    throw createError(400, NOT_SIGNED);
  }

  const milestoneData = await Milestones.find({
    userId,
  });

  return milestoneData;
};

const createMilestonesByUserId = async (userId, milestoneBody) => {
  const user = await Users.findOne({ email: userId }).exec();

  if (!user) {
    throw createError(400, NOT_SIGNED);
  }

  const milestoneData = await Milestones.create({
    userEmail: userId,
    ...milestoneBody,
  });

  user.milestones.push(milestoneData._id);
  await user.save();

  return milestoneData;
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getSchedulesByUserId,
  createSchedulesByUserId,
  getMilestonesByUserId,
  createMilestonesByUserId,
};
