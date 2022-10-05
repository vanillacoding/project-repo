const closeGame = require("./closeGame");
const logger = require("../../../config/winston");

module.exports = async () => {
  try {
    logger.info("Start: close game");

    await closeGame();

    logger.info("End: close game");
  } catch (err) {
    logger.error(err);
  }
};
