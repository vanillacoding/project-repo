const express = require("express");
const gamesController = require("../controllers/games.controller");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

router.get("/:game_date/schedule", gamesController.getSchedule);
router.get("/:game_date/players", gamesController.getPlayers);
router.get("/:game_date/betting", gamesController.getBettingStatus);
router.post("/:game_date/betting", authenticateUser, gamesController.postBetting);
router.get("/:game_date/rankings/users", gamesController.getUserRankings);
router.get("/:game_date/rankings/positions", gamesController.getPositionRankings);
router.get("/:game_date/rankings/players", gamesController.getPlayerRankings);
router.get("/:game_date/roaster", authenticateUser, gamesController.getRoaster);
router.get("/betting-history", authenticateUser, gamesController.getBettingHistory);

module.exports = router;
