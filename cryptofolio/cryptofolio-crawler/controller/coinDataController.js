const Coin = require("../models/coinModel");

exports.getCoinData = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};
