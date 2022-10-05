const express = require('express');

const controller = require('./controller/maze.controller');

const router = express.Router();

router.get('/:mazeId', controller.getMaze);

router.post('/', controller.postMaze);

module.exports = router;
