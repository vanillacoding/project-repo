const catchAsync = require("../utils/catchAsync");
const { schedulesService } = require("../services");

const updateSchedule = catchAsync(async (req, res) => {
  const { scheduleId } = req.params;

  const schedule = await schedulesService.updateSchedule(scheduleId, req.body);

  res.json({
    result: "ok",
    data: schedule,
  });
});

const deleteSchedule = catchAsync(async (req, res) => {
  const { scheduleId } = req.params;

  await schedulesService.deleteSchedule(scheduleId);

  res.json({
    result: "ok",
  });
});

module.exports = {
  updateSchedule,
  deleteSchedule,
};
