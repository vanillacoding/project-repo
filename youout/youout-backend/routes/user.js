const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const userController = require('./controllers/user.controller');

router.get('/', verifyToken, userController.sendUserInfo);

module.exports = router;
