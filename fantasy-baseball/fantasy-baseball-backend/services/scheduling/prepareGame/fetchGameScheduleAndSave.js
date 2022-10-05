const Game = require("../../../models/Game");
const fetchGameSchedule = require("../../fetchGameInfoFromKBO/fetchGameSchedule");
const logger = require("../../../config/winston");

module.exports = async (dateString) => {
  try {
    logger.info("Start: fetch game schedule and save");

    const gameList = await fetchGameSchedule(dateString);
    logger.info(
      `Log: fetch ${dateString} game schedule, game: ${gameList.length}`
    );

    await Game.findOneAndUpdate(
      { gameDate: dateString },
      {
        gameDate: dateString,
        schedule: gameList,
        createdAt: new Date(),
      },
      {
        new: true,
        upsert: true,
      }
    );

    logger.info(`Log: ${dateString} Game document is created`);
    logger.info("Success: fetch game schedule and save");
  } catch (err) {
    logger.error(err);
  }
};
