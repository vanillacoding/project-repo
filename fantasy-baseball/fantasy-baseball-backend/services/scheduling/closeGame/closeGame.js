const { format } = require("date-fns");
const Game = require("../../../models/Game");
const logger = require("../../../config/winston");

module.exports = async () => {
  try {
    const dateString = format(new Date(), "yyyyMMdd");

    logger.info(`Start: close ${dateString} game`);

    await Game.findOneAndUpdate(
      {
        gameDate: dateString,
      },
      {
        isOpened: true,
      }
    );

    logger.info(`Success: close ${dateString} game`);
  } catch (err) {
    logger.error(err);
  }
};
