const createError = require("http-errors");

const User = require("../models/User");
const { gameType, message } = require("../constants");

exports.getUserData = async function (req, res, next) {
  try {
    const currentUser = await User.findById(req.userId);

    if (!currentUser) {
      next(createError(401));
      return;
    }

    res.status(200).json({
      code: 200,
      message: message.SUCCESS,
      data: { user: currentUser },
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.updateFinalStageRecord = async function (req, res, next) {
  try {
    const { game } = req.body;
    let stage = 0;

    switch (game) {
      case gameType.SHOOTING_GAME:
        stage = 1;
        break;
      case gameType.PUZZLE_GAME:
        stage = 2;
        break;
      case gameType.MATCHING_GAME:
        stage = 3;
        break;
      default:
        stage = 0;
    }

    const user = await User.findOne({ _id: req.userId });

    if (user.lastStage < stage) {
      await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $set: {
            lastStage: stage,
          },
        }
      );
    }

    res.json({ code: 200, message: message.SUCCESS });
  } catch (err) {
    next(createError(500, err));
  }
};
