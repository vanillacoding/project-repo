const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const uploadsController = require('../controllers/uploads.controller');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/', verifyToken, upload.single('image'), uploadsController.uploadImage);

module.exports = router;
