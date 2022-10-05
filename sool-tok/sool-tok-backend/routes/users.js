const express = require('express');
const router = express.Router();

const { ROUTE } = require('../configs/constants');

const { verifyToken } = require('./middlewares/authorization');
const userController = require('./controllers/users.controller');

router.post(ROUTE.LOGIN.GOOGLE, userController.googleLogin);
router.post(ROUTE.LOGIN.TOKEN, userController.tokenLogin);
router.post(ROUTE.USER.LOGOUT, verifyToken, userController.logoutUser);
router.get(ROUTE.USER.FRIENDS.ROOT, verifyToken, userController.getFriendList);
router.get(ROUTE.USER.FRIENDS.REQUEST, verifyToken, userController.getFriendRequestList);
router.post(ROUTE.USER.FRIENDS.REQUEST, verifyToken, userController.requestFriend);
router.put(ROUTE.USER.FRIENDS.REQUEST, verifyToken, userController.responseFriendRequest);

module.exports = router;
