const express = require('express');
const router = express.Router();

const validateObjectId = require('./middleware/validateObjectId');
const verifyToken = require('./middleware/authorization');
const chatController = require('./controllers/chat.controller');

const { ROUTES } = require('../constants/routes');

router.get(
  ROUTES.CHANNEL_ID,
  verifyToken,
  validateObjectId,
  chatController.getChat,
);

router.put(ROUTES.INDEX, verifyToken, chatController.addChat);

module.exports = router;
