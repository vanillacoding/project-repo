const express = require('express');
const router = express.Router();
const historiesController = require('./controllers/histories.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/:history_id', verifyToken, historiesController.sendHistory);

module.exports = router;
