const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const gamesController = require('./controllers/games.controller');

router.get('/', verifyToken, gamesController.sendGames);
router.post('/', verifyToken, gamesController.create);

router.get('/:game_id', verifyToken, gamesController.sendGame);
router.put('/:game_id/update', verifyToken, gamesController.update);
router.delete('/:game_id/delete', verifyToken, gamesController.delete);

module.exports = router;
