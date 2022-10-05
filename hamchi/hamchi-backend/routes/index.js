const express = require('express');

const user = require('./user');
const posts = require('./posts');
const submissions = require('./submissions');
const chats = require('./chats');

const router = express.Router();

router.use('/user', user);
router.use('/posts', posts);
router.use('/submissions', submissions);
router.use('/chats', chats);

module.exports = router;
