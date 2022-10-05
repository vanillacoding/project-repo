const UserBettingData = require("../../../models/UserBettingData");
const logger = require("../../../config/winston");

module.exports = async (gameDate, session) => {
  try {
    logger.info("Start: update user rankings");

    const userBettingData = await UserBettingData
      .find(
        { gameDate },
        "user earnedMoney bettingMoney profit",
        { session }
      ).lean();

    userBettingData
      .forEach((data) => {
        const currentData = data;
        const profit = data.earnedMoney - data.bettingMoney;
        currentData.profit = profit;
      });

    const sortingUserBettingData = userBettingData
      .sort((a, b) => {
        if (a.profit > b.profit) return -1;
        if (a.profit < b.profit) return 1;
        return 0;
      });

    for (let i = 0; i < sortingUserBettingData.length; i += 1) {
      const currentData = sortingUserBettingData[i];
      const prevData = sortingUserBettingData[i - 1];
      currentData.rank = i + 1;

      if (i !== 0 && currentData.profit === prevData.profit) {
        currentData.rank = prevData.rank;
      }
    }

    await Promise.all(
      sortingUserBettingData.map((data) => (
        UserBettingData.findByIdAndUpdate(
          { gameDate, _id: data._id },
          { rank: data.rank },
          {
            upsert: true,
            session,
          }
        )
      ))
    );

    logger.info("Success: update user rankings");

    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};
