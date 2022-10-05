const { startSession } = require("mongoose");
const { format, subDays } = require("date-fns");
const fetchGameScheduleAndSave = require("./fetchGameScheduleAndSave");
const fetchGameResultAndSave = require("./fetchGameResultAndSave");
const updateHitterScore = require("./updateHitterScore");
const updatePitcherScore = require("./updatePitcherScore");
const updateTotalScore = require("./updateTotalScore");
const updateEarnedMoney = require("./updateEarnedMoney");
const updateUserMoney = require("./updateUserMoney");
const updateUserRankings = require("./updateUserRankings");
const logger = require("../../../config/winston");

module.exports = async () => {
  try {
    const dateString = format(new Date(), "yyyyMMdd");
    const yesterdayDateString = format(
      subDays(new Date(), 1),
      "yyyyMMdd"
    );

    logger.info(`Start: prepare ${dateString} game`);

    await fetchGameScheduleAndSave(dateString);

    const isFetchGameResultComplete = await fetchGameResultAndSave(yesterdayDateString);
    if (!isFetchGameResultComplete) {
      return;
    }

    const updateScoreSession = await startSession();
    updateScoreSession.startTransaction();

    const isUpdateScoreComplete = [
      await updateHitterScore(yesterdayDateString, updateScoreSession),
      await updatePitcherScore(yesterdayDateString, updateScoreSession),
      await updateTotalScore(yesterdayDateString, updateScoreSession),
    ].every((result) => result);

    if (isUpdateScoreComplete) {
      await updateScoreSession.commitTransaction();
    } else {
      await updateScoreSession.abortTransaction();
      updateScoreSession.endSession();
      return;
    }

    updateScoreSession.endSession();

    const updateUserSession = await startSession();
    updateUserSession.startTransaction();

    const isUpdateUserComplete = [
      await updateEarnedMoney(yesterdayDateString, updateUserSession),
      await updateUserMoney(yesterdayDateString, updateUserSession),
      await updateUserRankings(yesterdayDateString, updateUserSession),
    ].every((result) => result);

    if (isUpdateUserComplete) {
      await updateUserSession.commitTransaction();
    } else {
      await updateUserSession.abortTransaction();
    }
    updateUserSession.endSession();

    logger.info("End: prepare game");
  } catch (err) {
    logger.error(err);
  }
};
