const cron = require("node-cron");
const Ppt = require("../models/Ppt");
const PptSlide = require("../models/PptSlide");

const dbSchedulerLoader = async () => {
  const yesterDay = new Date();
  yesterDay.setDate(yesterDay.getDate() - 1);

  cron.schedule("0 1 * * *", async () => {
    await Ppt.deleteMany({
      createdAt: {
        $lte: yesterDay.toISOString(),
      },
    });
    await PptSlide.deleteMany({
      createdAt: {
        $lte: yesterDay.toISOString(),
      },
    });
  });
};

module.exports = dbSchedulerLoader;
