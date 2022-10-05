const express = require("express");
const router = express.Router();

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const schedule = require("node-schedule");

const { MESSAGE } = require("../constant");
const { getUTCHour } = require("../utils/getUTCHour");
const schedulePushNotification = require("../utils/notification");

dayjs.extend(utc);

router.post("/", (req, res, next) => {
  const { notificationToken, duration, alarmTime, doseTimes } = req.body;

  try {
    if (notificationToken && duration && alarmTime && doseTimes) {
      const today = dayjs().utc();
      const startDate = today.format();
      const endDate = today.add(Number(duration), "day").format();

      const times = Object.keys(doseTimes);

      for (let i = 0; i < times.length; i++) {
        const { hour, minute } = getUTCHour(alarmTime, times[i]);

        schedule.scheduleJob(
          { start: startDate, end: endDate, rule: `${minute} ${hour} * * *` },
          () => schedulePushNotification(notificationToken)
        );
      }

      return res.status(201).json({ message: MESSAGE.PUSH_NOTIFICATION_CREATE_SUCCESS });
    }

    res.status(400).json({ message: MESSAGE.PUSH_NOTIFICATION_CREATE_FAIL });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
