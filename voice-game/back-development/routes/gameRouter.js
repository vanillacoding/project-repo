const express = require("express");
const router = express.Router();
const gameController = require("./controllers/gameController");

router
  .route("/littleForest")
  .get(gameController.fetchRoomsDB)
  .post(gameController.createRoomDB)
  .patch(gameController.changeRoomStatus);

router
  .route("/littleForest/:roomId")
  .get(gameController.getRoomData)
  .patch(gameController.patchRoomData)
  .delete(gameController.deleteRoomDB);

router
  .route("/monsterEscape")
  .get(gameController.fetchRoomsDB)
  .post(gameController.createRoomDB)
  .patch(gameController.changeRoomStatus);

router
  .route("/monsterEscape/:roomId")
  .get(gameController.getRoomData)
  .patch(gameController.patchRoomData)
  .delete(gameController.deleteRoomDB);

router
  .route("/energyBattle")
  .get(gameController.fetchRoomsDB)
  .post(gameController.createRoomDB)
  .patch(gameController.changeRoomStatus);

router
  .route("/energyBattle/:roomId")
  .get(gameController.getRoomData)
  .patch(gameController.patchRoomData)
  .delete(gameController.deleteRoomDB);

module.exports = router;
