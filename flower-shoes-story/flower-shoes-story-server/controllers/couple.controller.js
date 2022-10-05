const Couple = require("../models/Couple");

exports.getScore = async (req, res, next) => {
  try {
    const couple = await Couple.findById(req.userInfo.couple._id);

    return res.status(200).json({
      result: "success",
      data: couple.score,
    });
  } catch (error) {
    next(error);
  }
};
