var express = require('express');
var router = express.Router();
const { verifyToken } = require('./middlewares/authentication');
const userController = require('./controller/user.controller');

router.get('/:id/mycats', verifyToken, userController.sendMyCatData);
router.get('/:id/likedcats', verifyToken, userController.sendLikedCatData)
module.exports = router;
