const userService = require("../services/user.service");

exports.getAlarmTime = async (req, res, next) => {
  const { user_id } = req.userInfo;

  try {
    const patientId = await userService.findPatientId(user_id);
    const alarmTime = await userService.getAlarmTime(patientId);

    res.status(200).json({ result: "success", data: alarmTime });
  } catch (error) {
    next(error);
  }
};
