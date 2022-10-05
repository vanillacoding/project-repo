const express = require("express");
const router = express.Router();
const googleFitController = require("../controller/googleFit");

router.post("/", googleFitController.postGoogleToken);

module.exports = router;
