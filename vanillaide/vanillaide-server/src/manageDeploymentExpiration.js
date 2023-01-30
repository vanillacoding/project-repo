const schedule = require("node-schedule");
const Project = require("./models/Project");

const now = new Date();
const oneDayBefore = new Date(now.setDate(now.getDate() - 1));

module.exports = () => {
  schedule.scheduleJob("0 * * * *", async function () {
    await Project.updateMany(
      { deployedAt: { $lte: ["$deployedAt", oneDayBefore] } },
      { $set: { deployLink: "" } },
    );
  });
};
