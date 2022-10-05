const express = require('express');
const router = express.Router();

const userController = require('../routes/controllers/userController');

router.post('/login', userController.getLogin);

module.exports = router;
