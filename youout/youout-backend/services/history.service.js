const Game = require('../models/Game');
const History = require('../models/History');

const createHistory = async ({ users, gameId }) => {
  const game = await Game.findById(gameId);
  const mappedUsers = users.map((user) => {
    user.lastSolvedQuiz = user.gameIndex;
    user.id = user._id;
    return user;
  });

  return await History.create({ users: mappedUsers, game: { id: gameId, name: game.name }});
};

const getHistoryByGameId = async ({ historyId }) => {
  return await History.findById(historyId).populate('users.id');
};

module.exports = {
  createHistory,
  getHistoryByGameId,
};
