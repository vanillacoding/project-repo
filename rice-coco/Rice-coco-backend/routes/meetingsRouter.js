const express = require('express');
const meetingsRouter = express.Router();
const meetingsControllers = require('../controllers/meetingsControllers');
const verifyToken = require('../middlewares/verifyToken');
const ROUTES = require('../constants/routes');

meetingsRouter.get(
  ROUTES.HOME,
  verifyToken,
  meetingsControllers.getAllFilteredMeetings
);

meetingsRouter.get(
  ROUTES.MEETING_DETAIL,
  verifyToken,
  meetingsControllers.getMeetingDetail
);

meetingsRouter.get(
  `${ROUTES.USERS}${ROUTES.USER_DETAIL}`,
  verifyToken,
  meetingsControllers.getActiveMeetingByUserId
);

meetingsRouter.get(
  `${ROUTES.MEETING_DETAIL}${ROUTES.CHAT}`,
  verifyToken,
  meetingsControllers.getAllFilteredMessages
);

meetingsRouter.post(
  ROUTES.HOME,
  verifyToken,
  meetingsControllers.createMeeting
);

meetingsRouter.put(
  `${ROUTES.MEETING_DETAIL}${ROUTES.JOIN}`,
  verifyToken,
  meetingsControllers.joinMeeting
);

module.exports = meetingsRouter;
