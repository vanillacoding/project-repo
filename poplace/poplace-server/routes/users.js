const express = require("express");
const router = express.Router();
const multer = require("multer");

const usersController = require("../controllers/usersController");
const pinsController = require("../controllers/pinsController");

const upload = multer();

router.post("/login", usersController.login);
router.post("/signup", upload.fields([{ name: "photo" }]), usersController.signup);
router.delete("/delete", usersController.delete, pinsController.delete);

module.exports = router;
