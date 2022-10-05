const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/authorization');
const usersController = require('../controller/users.controller');

router.post('/login', usersController.getLoginOrSignup);
router.post('/auth', usersController.getAuth);
router.get('/:user_id/treasures', ensureAuthenticated, usersController.getUserTreasures);
router.get('/:user_id/huntings', ensureAuthenticated, usersController.getUserHuntings);

module.exports = router;
