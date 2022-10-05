const userService = require("../services/user.service");

exports.updateInformation = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;
    const { name, address } = req.body;

    const pharmacistId = await userService.findPharmacistId(user_id);

    await userService.changePharmacistSetting(pharmacistId, name, address);

    res.status(200).json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getInformation = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;

    const data = await userService.findPharmacistInfo(user_id);

    res.status(200).json({ result: "success", data });
  } catch (error) {
    next(error);
  }
};

exports.updateAlarmTime = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;
    const { alarmTime } = req.body;

    const patientId = await userService.findPatientId(user_id);
    await userService.changeAlarmSettings(patientId, alarmTime);

    res.status(200).json({ result: "success", data: alarmTime });
  } catch (error) {
    next(error);
  }
};

exports.getAlarmTime = async (req, res, next) => {
  const { user_id: userId } = req.userInfo;

  try {
    const alarm = await userService.findAlarmTime(userId);

    res.status(200).json({ result: "success", data: alarm });
  } catch (error) {
    next(error);
  }
};
