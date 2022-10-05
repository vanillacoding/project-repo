const express = require("express");
const router = express.Router({ mergeParams: true });
const albumController = require("../controller/customAlbum");

router.get("/", albumController.getAlbum);

router.post("/", albumController.postAlbum);

router.get("/:id", albumController.getAlbumDetail);

router.patch("/:id", albumController.patchAlbumDetail);

router.delete("/:id", albumController.deleteAlbumDetail);

module.exports = router;
