const schedule = require("node-schedule");
const Pin = require("../models/Pin");
const getDate = require("../utils/getDate");

function nodeSchedule() {
  const rule = new schedule.RecurrenceRule();

  rule.second = 0;

  async function updatePin() {
    const pins = await Pin.find({ active: true }).lean();

    for (let i = 0; i < pins?.length; i++) {
      const pin = pins[i];
      const { createdAt, savedAt, _id: id } = pin;

      if (savedAt) {
        const timeOver = getDate(savedAt);

        if (timeOver) {
          await Pin.findByIdAndUpdate(id, { active: false });
        }

        continue;
      }

      const timeOver = getDate(createdAt);

      if (timeOver) {
        await Pin.findByIdAndUpdate(id, { active: false });
      }
    }
  }

  const job = schedule.scheduleJob("*/1 * * * * *", () => updatePin());
}

module.exports = nodeSchedule;
