const express = require("express");
const genreController = require("./controllers/genre.controller");

const router = express.Router();

router.get("/", genreController.getAll);

module.exports = router;
