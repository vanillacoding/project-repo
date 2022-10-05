const createError = require("http-errors");

const { Milestones } = require("../models");
const { NOT_MILESTONE } = require("../constant/errorMessage/milestones");

const updateMilestone = async (milestoneId, userBody) => {
  const milestone = await Milestones.findByIdAndUpdate(milestoneId, userBody, { new: true })
    .lean()
    .exec();

  if (!milestone) {
    throw createError(400, NOT_MILESTONE);
  }

  return milestone;
};

const deleteMilestone = async (milestoneId) => {
  return Milestones.findByIdAndUpdate(milestoneId, { isDeleted: true }).lean().exec();
};

module.exports = {
  updateMilestone,
  deleteMilestone,
};
