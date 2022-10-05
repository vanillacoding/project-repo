const express = require('express');
const usersRouter = express.Router();
const userControllers = require('../controllers/userControllers');
const verifyToken = require('../middlewares/verifyToken');
const ROUTES = require('../constants/routes');

usersRouter.get(ROUTES.USER_DETAIL, verifyToken, userControllers.getUserInfo);

usersRouter.post(ROUTES.LOGIN, userControllers.login);
usersRouter.post(ROUTES.SIGNUP, userControllers.signup);

usersRouter.put(
  ROUTES.USER_DETAIL,
  verifyToken,
  userControllers.updateUserInfo
);

usersRouter.put(
  `${ROUTES.USER_DETAIL}${ROUTES.PREFERRED_PARTNER}`,
  verifyToken,
  userControllers.updatePreferredPartner
);

usersRouter.put(
  `${ROUTES.USER_DETAIL}${ROUTES.PROMISE}`,
  verifyToken,
  userControllers.updatePromise
);

usersRouter.put(
  `${ROUTES.USER_DETAIL}${ROUTES.FAVORITE_PARTNERS}`,
  verifyToken,
  userControllers.addFavoritePartners
);

module.exports = usersRouter;
