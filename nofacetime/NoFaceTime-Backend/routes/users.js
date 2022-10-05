const express = require('express');
const router = express.Router();

const { getUser } = require('./controller/user.controller');

router.get('/:userId', getUser);

module.exports = router;
