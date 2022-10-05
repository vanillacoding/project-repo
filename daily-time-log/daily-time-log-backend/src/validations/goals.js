const { NOT_MILESTONE_ID } = require("../constant/errorMessage/milestones");
const { NOT_SUMMARY, NOT_GOAL_ID } = require("../constant/errorMessage/goals");
const {
  INVALID_MONGO_ID,
  INVALID_STRING,
  INVALID_BOOLEAN,
  INVALID_DATE,
} = require("../constant/errorMessage/invalid");

const paramsGoalId = {
  goalId: {
    notEmpty: {
      errorMessage: NOT_GOAL_ID,
      bail: true,
    },
    isMongoId: {
      errorMessage: INVALID_MONGO_ID,
      bail: true,
    },
  },
};

const createGoal = {
  milestoneId: {
    notEmpty: {
      errorMessage: NOT_MILESTONE_ID,
      bail: true,
    },
    isMongoId: {
      errorMessage: INVALID_MONGO_ID,
      bail: true,
    },
  },
  isDeleted: {
    default: { options: false },
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
};

const updateGoal = {
  milestoneId: {
    notEmpty: {
      errorMessage: NOT_MILESTONE_ID,
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
};

module.exports = {
  createGoal,
  updateGoal,
  paramsGoalId,
};
