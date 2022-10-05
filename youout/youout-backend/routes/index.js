const express = require('express');
const router = express.Router();
const loginRouter = require('./login');
const gamesRouter = require('./games');
const userRouter = require('./user');
const historiesRouter = require('./histories');
const awsRouter = require('./aws');

router.use('/login', loginRouter);
router.use('/games', gamesRouter);
router.use('/user', userRouter);
router.use('/histories', historiesRouter);
router.use('/aws', awsRouter);

module.exports = router;
