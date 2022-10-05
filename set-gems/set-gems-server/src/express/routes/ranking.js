const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const Ranking = require("../models/Ranking");
const { ERROR } = require("../../constants/messages");
const { OK, BAD_REQUEST } = require("../../constants/statusCodes");

router.get("/", async function (req, res, next) {
  try {
    const ranking = await Ranking.find().sort({ time: 1 }).select("name time");

    res.status(OK);
    res.json({ ranking });
  } catch(err) {
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  const maxRankingCount = 20;
  const { name, time } = req.body;

  try {
    if (!validateName(name)) {
      throw createError(BAD_REQUEST, ERROR.INVALID_NAME);
    }

    if (!validateTime(time)) {
      throw createError(BAD_REQUEST, ERROR.INVALID_TIME);
    }

    const rankingCount = await Ranking.count({});

    if (rankingCount === maxRankingCount) {
      const [twentyFirst] = await Ranking.find().sort({ time: -1 }).limit(1);
      twentyFirst.deleteOne();
    }

    Ranking.create({ name, time });

    res.status(OK);
    res.json({ result: "ok" });
  } catch(err) {
    next(err);
  }
});

module.exports = router;

function validateName(name) {
  return (name !== "") && (typeof name === "string");
}

function validateTime(time) {
  return typeof time === "number";
}
