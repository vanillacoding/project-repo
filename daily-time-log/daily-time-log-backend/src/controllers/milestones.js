const catchAsync = require("../utils/catchAsync");
const { milestonesService } = require("../services");

const updateMilestone = catchAsync(async (req, res) => {
  const { milestoneId } = req.params;

  const milestone = await milestonesService.updateMilestone(milestoneId, req.body);

  res.json({
    result: "ok",
    data: milestone,
  });
});

const deleteMilestone = catchAsync(async (req, res) => {
  const { milestoneId } = req.params;

  await milestonesService.deleteMilestone(milestoneId);

  res.json({
    result: "ok",
  });
});

module.exports = {
  updateMilestone,
  deleteMilestone,
};
