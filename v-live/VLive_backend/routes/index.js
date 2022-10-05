const express = require('express');
const router = express.Router();

const loginController = require('./controllers/login.controller');

const { ROUTES } = require('../constants/routes');

router.post(ROUTES.LOGIN, loginController.login);

module.exports = router;
