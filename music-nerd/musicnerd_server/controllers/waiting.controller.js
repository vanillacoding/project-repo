const Game = require('../models/Game');

exports.getGames = async (req, res) => {
  try {
    const gameList = await Game.find().lean();

    res.status(200).json({ gameList });
  } catch (err) {
    console.error('getGames error', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

exports.makeGame = async (req, res) => {
  try {
    const { userId, gameTitle } = req.body;
    const game = await Game.findOne({ game_title: gameTitle }).lean();

    if (game) {
      return res.status(400).json({
        errorMessage: 'Same game title already exists.'
      });
    }

    const newGame = await Game.create({
      game_title: gameTitle,
      thumbnail_url: `${process.env.AMAZON_S3_URI}/game_cover/gameCover${Math.floor(Math.random()*17)}.jpg`,
      is_playing: false,
      created_by: userId,
      players: [],
      score: {}
    });

    res.status(200).json({
      gameId: newGame._id
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

exports.enterGame = async (req, res) => {
  const { userId } = res.locals;
  const { gameId } = req.body;

  try {
    const targetGame = await Game.findById(gameId);
    const hasUserJoined = targetGame.players.findIndex(player => {
      return player.userId.toString() === userId;
    }) > -1 ? true : false;

    if (hasUserJoined) {
      return res.status(400).json({
        errorMessage: 'Cannot join the room.'
      });
    }

    if (targetGame.is_playing) {
      return res.status(400).json({
        errorMessage: 'Game already starts.'
      });
    }

    if (targetGame.players.length >= 8) {
      return res.status(400).json({
        errorMessage: 'Max capacity of room exceeds.'
      });
    }

    res.status(200).json({
      result: 'success'
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};
