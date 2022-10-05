const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const templates = require('./templates');

router.use('/auth', auth);
router.use('/users', users);
router.use('/templates', templates);

module.exports = router;
