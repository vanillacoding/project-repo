const router = require('express').Router();
const authController = require('./controllers/auth.controller');

router.post('/authenticate', authController.authenticate);

module.exports = router;
