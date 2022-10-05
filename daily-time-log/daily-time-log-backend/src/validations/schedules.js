const {
  INVALID_MONGO_ID,
  INVALID_DATE,
  INVALID_BOOLEAN,
  INVALID_STRING,
} = require("../constant/errorMessage/invalid");
const { NOT_SCHEDULES_ID, NOT_SUMMARY } = require("../constant/errorMessage/schedules");

const paramsScheduleId = {
  scheduleId: {
    notEmpty: {
      errorMessage: NOT_SCHEDULES_ID,
      bail: true,
    },
    isMongoId: {
      errorMessage: INVALID_MONGO_ID,
      bail: true,
    },
  },
};

const updateSchedule = {
  scheduleId: {
    notEmpty: {
      errorMessage: NOT_SCHEDULES_ID,
      bail: true,
    },
    isMongoId: {
      errorMessage: INVALID_MONGO_ID,
      bail: true,
    },
  },
  summary: {
    notEmpty: {
      errorMessage: NOT_SUMMARY,
      bail: true,
    },
    isString: {
      errorMessage: `summary가 ${INVALID_STRING}`,
      bail: true,
    },
  },
  googleId: {
    isString: {
      errorMessage: `google id가 ${INVALID_STRING}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  done: {
    isBoolean: {
      errorMessage: `done이 ${INVALID_BOOLEAN}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  description: {
    isString: {
      errorMessage: `description이 ${INVALID_STRING}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  "start.date": {
    isISO8601: {
      errorMessage: `start.date가 ${INVALID_DATE}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  "start.dateTime": {
    isISO8601: {
      errorMessage: `start.dateTime이 ${INVALID_DATE}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  "start.timeZone": {
    isString: {
      errorMessage: `start.timeZone이 ${INVALID_STRING}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  "end.date": {
    isISO8601: {
      errorMessage: `end.date가 ${INVALID_DATE}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  "end.dateTime": {
    isISO8601: {
      errorMessage: `end.dateTime이 ${INVALID_DATE}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  "end.timeZone": {
    isString: {
      errorMessage: `end.timeZone이 ${INVALID_STRING}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  isAllDay: {
    isBoolean: {
      errorMessage: `isAllDay가 ${INVALID_BOOLEAN}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
};

module.exports = {
  paramsScheduleId,
  updateSchedule,
};
