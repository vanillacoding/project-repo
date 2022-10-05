const {
  INVALID_EMAIL,
  INVALID_MONGO_ID,
  INVALID_DATE,
  INVALID_BOOLEAN,
  INVALID_NUMERIC,
  INVALID_STRING,
} = require("../constant/errorMessage/invalid");

const {
  NOT_EMAIL,
  NOT_USER_ID,
  NOT_ACCESS_TOKEN,
  NOT_SUMMARY,
} = require("../constant/errorMessage/users");

const signIn = {
  email: {
    notEmpty: {
      errorMessage: NOT_EMAIL,
      bail: true,
    },
    isEmail: {
      errorMessage: INVALID_EMAIL,
      bail: true,
    },
  },
  name: {
    default: { options: null },
  },
  themeMode: {
    default: { options: "light" },
  },
};

const paramsUserId = {
  userId: {
    notEmpty: {
      errorMessage: NOT_USER_ID,
      bail: true,
    },
    isMongoId: {
      errorMessage: INVALID_MONGO_ID,
      bail: true,
    },
  },
};

const updateUser = {
  userId: {
    notEmpty: {
      errorMessage: NOT_USER_ID,
      bail: true,
    },
    isEmail: {
      errorMessage: INVALID_EMAIL,
      bail: true,
    },
  },
  "workTime.startTime": {
    isISO8601: {
      errorMessage: `startTime이 ${INVALID_DATE}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  "workTime.endTime": {
    isDate: {
      errorMessage: `endTime이 ${INVALID_DATE}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  accessToken: {
    notEmpty: {
      errorMessage: NOT_ACCESS_TOKEN,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  googleSync: {
    isBoolean: {
      errorMessage: `googleSync가 ${INVALID_BOOLEAN}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
  sleepTime: {
    isNumeric: {
      errorMessage: `sleepTime이 ${INVALID_NUMERIC}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
};

const queryDate = {
  userId: {
    notEmpty: {
      errorMessage: NOT_USER_ID,
      bail: true,
    },
    isMongoId: {
      errorMessage: INVALID_MONGO_ID,
      bail: true,
    },
  },
  date: {
    isISO8601: {
      errorMessage: `query date ${INVALID_DATE}`,
      bail: true,
    },
    optional: {
      options: {
        checkFalsy: true,
      },
    },
  },
};

const createSchedulesByUserId = {
  userId: {
    notEmpty: {
      errorMessage: NOT_USER_ID,
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

const createMilestonesByUserId = {
  userId: {
    notEmpty: {
      errorMessage: NOT_USER_ID,
      bail: true,
    },
    isEmail: {
      errorMessage: INVALID_EMAIL,
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
  done: {
    default: { options: false },
    isBoolean: {
      errorMessage: `done이 ${INVALID_BOOLEAN}`,
      bail: true,
    },
  },
  isDeleted: {
    default: { options: false },
    isBoolean: {
      errorMessage: `isDeleted가 ${INVALID_BOOLEAN}`,
      bail: true,
    },
  },
  runningTimes: {
    default: { options: [] },
  },
};

module.exports = {
  signIn,
  paramsUserId,
  updateUser,
  queryDate,
  createSchedulesByUserId,
  createMilestonesByUserId,
};
