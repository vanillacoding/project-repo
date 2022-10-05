const userService = require("../services/user.service");

exports.updateUserInfo = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const { type, date, partnerId, discharge } = req.body;

    const user = await userService.updateUserInfo(_id, type, partnerId, date, discharge);

    return res.status(200).json({
      result: "success",
      data: {
        user,
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { _id, couple, partner_id } = req.userInfo;

    let coupleId = "";

    if (couple) {
      coupleId = couple.id;
    }

    await userService.deleteUserAndCouple(_id, coupleId, partner_id);

    return res.status(200).json({
      result: "success",
    });
  } catch (error) {
    next(error);
  }
};
