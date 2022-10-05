const express = require('express');
const router = express.Router();

const validateObjectId = require('./middleware/validateObjectId');
const validateBody = require('./middleware/validateBody');
const verifyToken = require('./middleware/authorization');
const channelController = require('./controllers/channel.controller');

const { ROUTES } = require('../constants/routes');

router.get(ROUTES.INDEX, channelController.getChannels);
router.post(
  ROUTES.INDEX,
  verifyToken,
  validateBody,
  channelController.createChannel,
);
router.get(ROUTES.CHANNEL_ID, validateObjectId, channelController.getChannel);
router.put(ROUTES.CHANNEL_ID, verifyToken, channelController.updateChannel);

module.exports = router;
