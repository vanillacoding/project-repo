const express = require('express');
const router = express.Router();

const { verifyToken } = require('./middlewares/authorization');
const photoController = require('../routes/controllers/photoController.js');

router.get('/location',
  verifyToken,
  photoController.getPhotoByLocation
);

module.exports = router;
