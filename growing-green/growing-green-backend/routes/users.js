const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/login', usersController.getLoginOrSingUp);

module.exports = router;
