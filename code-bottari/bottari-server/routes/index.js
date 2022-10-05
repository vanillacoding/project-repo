const express = require("express");
const router = express.Router();

const { OK } = require("../constants/messages");

router.get("/", (req, res, next) => {
  res.send({ result: OK });
});

module.exports = router;
