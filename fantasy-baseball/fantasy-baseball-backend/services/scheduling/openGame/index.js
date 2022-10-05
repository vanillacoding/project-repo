const fetchStartingLineUpAndSave = require("./fetchStartingLineUpAndSave");
const sendGrouptMail = require("./sendGroupMail");
const logger = require("../../../config/winston");

module.exports = async () => {
  try {
    logger.info("Start: open game");

    await fetchStartingLineUpAndSave();
    // await sendGrouptMail("openEmail");

    logger.info("End: open game");
  } catch (err) {
    logger.error(err);
  }
};
