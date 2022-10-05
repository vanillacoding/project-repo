const User = require("../../../models/User");
const UserBettingData = require("../../../models/UserBettingData");
const logger = require("../../../config/winston");

module.exports = async (gameDate, session) => {
  try {
    logger.info("Start: update user money");

    const bettingResult = await UserBettingData
      .find(
        { gameDate },
        "user earnedMoney",
        { session }
      ).lean();

    await Promise.all(
      bettingResult.map((result) => (
        User.findOneAndUpdate(
          { _id: result.user },
          {
            $inc: {
              money: result.earnedMoney,
            },
          },
          { session }
        )
      ))
    );

    await Promise.all(
      bettingResult.map((result) => (
        UserBettingData.findOneAndUpdate(
          { gameDate, user: result.user },
          { isCalculated: true },
          { session }
        )
      ))
    );

    logger.info("Success: update user money");

    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};
