const express = require('express');
const router = express.Router();

const validateObjectId = require('./middleware/validateObjectId');
const verifyToken = require('./middleware/authorization');
const episodeController = require('./controllers/episode.controller');

const { ROUTES } = require('../constants/routes');

router.get(ROUTES.INDEX, episodeController.getEpisodes);
router.get(
  ROUTES.EPISODE_ID,
  verifyToken,
  validateObjectId,
  episodeController.getEpisode,
);

module.exports = router;
