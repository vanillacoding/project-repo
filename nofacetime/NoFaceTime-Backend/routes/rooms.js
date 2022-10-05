const express = require('express');
const router = express.Router();

const verifyToken = require('./middleware/verifyToken');
const sendMail = require('../utils/nodeMailer');

const {
  createNewRoom,
  deleteRoom,
  getRoom
} = require('./controller/room.controller');

router.get('/:roomId', getRoom);

router.post('/', verifyToken, createNewRoom);

router.delete('/:roomId', verifyToken, deleteRoom);

module.exports = router;
