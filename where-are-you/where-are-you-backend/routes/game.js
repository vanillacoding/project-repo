const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");

router.get("/puzzles", gameController.getPuzzles);
router.get("/passwords", gameController.getPasswords);

module.exports = router;
