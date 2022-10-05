const express = require('express');
const router = express.Router();

const { verifyToken } = require('./middlewares/authorization');
const { uploadPhoto } = require('./middlewares/uploadPhotos');
const usersController = require('./controllers/usersController');

router.get('/:userId/photos',
  verifyToken,
  usersController.getPhotoListByUserId
);

router.post('/:userId/photos',
  verifyToken,
  uploadPhoto.array('image', 5),
  usersController.savePhotos,
);

module.exports = router;
