const { INVALID_BOOLEAN, INVALID_STRING } = require("../constant/errorMessage/invalid");
const { NOT_MILESTONE_ID, NOT_SUMMARY } = require("../constant/errorMessage/milestones");

const paramsMilestoneId = {
  milestoneId: {
    notEmpty: {
      errorMessage: NOT_MILESTONE_ID,
      bail: true,
    },
  },
};

const updateMilestone = {
  milestoneId: {
    notEmpty: {
      errorMessage: NOT_MILESTONE_ID,
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
  isDeleted: {
    isBoolean: {
      errorMessage: `isDeleted가 ${INVALID_BOOLEAN}`,
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
  paramsMilestoneId,
  updateMilestone,
};
