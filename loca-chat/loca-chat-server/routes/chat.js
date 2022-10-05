const express = require('express');
const router = express.Router();
const multer = require('multer');
const chatController = require('../controllers/chat.controller');

const upload = multer();
const photoUpload = upload.fields([{ name: 'photo' }, { name: 'nickname' }]);

router.get('/:id', chatController.getChatList);
router.post('/', chatController.getNearByChats);
router.post('/add', chatController.addChat);
router.post('/:chatId/message/text', chatController.saveText);
router.post('/:chatId/message/image', photoUpload, chatController.saveImage);

module.exports = router;
