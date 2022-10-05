const express = require('express');
const router = express.Router();
const auth = require('../../../middlewares/auth');
const { getUserComments, getUserLikes } = require('./user.controller');

router.get('/:user_id/comments', auth, getUserComments);

router.get('/:user_id/likes', auth, getUserLikes);

module.exports = router;
