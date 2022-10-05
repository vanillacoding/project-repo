const express = require("express");
const router = express.Router({ mergeParams: true });
const gridController = require("../controller/customGrid");

router.get("/", gridController.getGrid);

router.post("/", gridController.postGrid);

router.get("/:id", gridController.getGridDetail);

router.patch("/:id", gridController.patchGridDetail);

router.delete("/:id", gridController.deleteGridDetail);

module.exports = router;
