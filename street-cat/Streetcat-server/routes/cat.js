const express = require('express');
const catController = require('./controller/cat.controller');
const router = express.Router();
const { verifyToken } = require('./middlewares/authentication');

router.get('/', verifyToken, catController.getHandler);
router.get('/starcats', verifyToken, catController.getHandler);
router.get('/:cat_id/comment', verifyToken, catController.findComments);
router.post('/', catController.registerCat);
router.post('/:cat_id/like', verifyToken, catController.increaseLike);
router.post('/:cat_id/comment', verifyToken, catController.addComment);
router.put('/:cat_id', verifyToken, catController.updateCatdata);
router.delete('/:cat_id', verifyToken, catController.deleteCat);
router.delete('/:cat_id/comment/:comment_id', verifyToken, catController.deleteComment);

module.exports = router;
