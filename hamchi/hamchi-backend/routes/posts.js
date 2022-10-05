const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');
const { verifyToken } = require('../middlewares/verifyToken');

router.patch('/close/:postId', verifyToken, PostsController.closePost);
router.get('/:userId', verifyToken, PostsController.myPosts);
router.post('/new', verifyToken, PostsController.createPost);
router.post('/', verifyToken, PostsController.getPosts);

module.exports = router;
