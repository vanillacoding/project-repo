const express = require('express');
const router = express.Router();
const auth = require('./auth');
const users = require('./users');
const comments = require('./comments');
const hashtags = require('./hashtags');
const countries = require('./countries');

router.use('/auth', auth);
router.use('/users', users);
router.use('/comments', comments);
router.use('/hashtags', hashtags);
router.use('/countries', countries);

module.exports = router;
