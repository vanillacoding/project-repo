const express = require('express');
const createError = require('http-errors');

const Match = require('../models/Match');

const ERROR = require('../constants/error');

const router = express.Router();

router.post('/new', async (req, res, next) => {
  const { gameId, firstTurn, players, users } = req.body.gameInfo;
  const newMatch = new Match({
    gameId,
    firstTurn,
    users,
    players,
  });

  await newMatch.save().catch((err) => {
    throw createError(502, err);
  });

  res.json({ success: true });
});

router.post('/join', async (req, res, next) => {
  const { userProfile, gameId } = req.body;

  let theMatch;

  try {
    theMatch = await Match.findOne({ gameId });
  } catch (err) {
    throw createError(502, err);
  }

  if (theMatch.players.length !== 1) {
    return res.json({ failure: true });
  }

  theMatch.status = 'prepare';
  theMatch.players.push(userProfile);
  theMatch.save();

  res.json({ success: true });
});

router.post('/play', async (req, res, next) => {
  const { gameId } = req.body;

  let theMatch;

  try {
    theMatch = await Match.findOne({ gameId });
  } catch (err) {
    throw createError(502, err);
  }

  theMatch.status = 'playing';
  theMatch.save();

  res.json(theMatch);
});

router.get('/:gameId', async (req, res, next) => {
  const { gameId } = req.params;

  let theMatch;
  try {
    theMatch = await Match.findOne({ gameId }).lean();
  } catch (err) {
    throw createError(502, err);
  }

  res.json(theMatch);
});

module.exports = router;
