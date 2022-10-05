const express = require('express');
const router = express.Router();

const { validateId } = require('../middlewares/authorization');
const controller = require('./controllers/users.controller');

router.post('/login', controller.verifyUser);

router.post('/signup', validateId, controller.createUser);

module.exports = router;
