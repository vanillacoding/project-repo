const express = require("express");
const userController = require("./controllers/user.controller");
const { uploadUserPhoto } = require("./middlewares/uploadPhoto");
const verifyToken = require("./middlewares/authorization");

const router = express.Router();

router.get("/sample/:user_id", verifyToken, userController.getSampleUser);
router.patch("/profile/photo/:user_id", verifyToken, uploadUserPhoto, userController.updateProfilePhoto);
router.patch("/profile/name/:user_id", verifyToken, userController.updateProfileName);
router.patch("/profile/likeGenre/:user_id", verifyToken, userController.updateLikeGenre);
router.patch("/profile/likeMusic/:user_id", verifyToken, userController.updateLikeMusic);

module.exports = router;
