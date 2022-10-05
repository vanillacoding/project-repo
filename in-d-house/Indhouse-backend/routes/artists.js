const express = require("express");
const artistController = require("./controllers/artist.controller");

const router = express.Router();

router.get("/by-specific/:user_id", artistController.getArtistsBySpecific);

module.exports = router;
