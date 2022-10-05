const express = require('express');
const router = express.Router();
const awsController = require('./controllers/aws.controller');

router.post('/rekognition', awsController.rekognition);

module.exports = router;
