const createError = require("http-errors");

const { Schedules } = require("../models");
const { NOT_SCHEDULE } = require("../constant/errorMessage/schedules");

const updateSchedule = async (scheduleId, userBody) => {
  const schedule = await Schedules.findByIdAndUpdate(scheduleId, userBody, { new: true })
    .lean()
    .exec();

  if (!schedule) {
    throw createError(400, NOT_SCHEDULE);
  }

  return schedule;
};

const deleteSchedule = async (scheduleId) => {
  return Schedules.findByIdAndDelete(scheduleId).lean().exec();
};

module.exports = {
  updateSchedule,
  deleteSchedule,
};
