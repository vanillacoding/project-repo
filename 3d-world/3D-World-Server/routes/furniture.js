const router = require("express").Router();

const furnitureControllers = require("../controllers/furniture.controller");
const deserialize = require("../middlewares/deserialize");

router.get("/", furnitureControllers.getFurniture);
router.post("/", furnitureControllers.insertFurniture);
router.patch("/", deserialize, furnitureControllers.updateFurniture);

module.exports = router;
