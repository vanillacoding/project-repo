const express = require('express');
const router = express.Router();

const authenticateUser = require('../middlewares/authentication');
const userController = require('../controllers/user.controller');

router.get('/:user_id/favorites', authenticateUser, userController.getFavoriteArtists);

router.post('/:user_id/favorites', authenticateUser, userController.saveFavoriteArtists);

router.get('/:user_id/profile', authenticateUser, userController.getProfile);

module.exports = router;
