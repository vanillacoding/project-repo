const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('./controllers/index.controller');

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;
