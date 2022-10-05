const express = require('express');
const router = express.Router();
const ChatsController = require('../controllers/chats.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/new', verifyToken, ChatsController.createChats);
router.get('/:userId', verifyToken, ChatsController.myChats);
router.get('/messages/:messageId', verifyToken, ChatsController.getMessages);

module.exports = router;
