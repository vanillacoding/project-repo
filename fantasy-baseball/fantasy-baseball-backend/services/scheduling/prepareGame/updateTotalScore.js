const Statistic = require("../../../models/Statistic");
const Game = require("../../../models/Game");
const logger = require("../../../config/winston");

const updateTotalScore = async (gameDate, session) => {
  try {
    logger.info("Start: update total score");

    const playerScores = await Statistic
      .find(
        { gameDate },
        "score",
        { session }
      )
      .lean();

    const playerTotalScore = playerScores.reduce(
      (totalScore, player) => (
        totalScore + player.score
      ), 0
    );

    await Game.findOneAndUpdate(
      { gameDate },
      { totalScore: playerTotalScore },
      { session }
    );

    logger.info("Success: update total score");
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

module.exports = updateTotalScore;
