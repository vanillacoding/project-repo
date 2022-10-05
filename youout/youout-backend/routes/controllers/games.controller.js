const gameService = require('../../services/game.service');
const { RES_RESULT } = require('../../constants');

const gamesControllerError = (message) => {
  console.error(`🔥 Game Controller Error => ${message}`);
};

exports.sendGame = async (req, res, next) => {
  try {
    const { game_id: gameId } = req.params;
    const game = await gameService.findById({ gameId });

    res.json({ result: RES_RESULT.OK, data: game });
  } catch (err) {
    gamesControllerError('sendGame');
    next(err);
  }
};

exports.sendGames = async (req, res, next) => {
  const { query } = req;
  const type = query.type.toLowerCase();

  switch (type) {
    case 'location': {
      try {
        const games = await gameService.findByLocation(query);
        res.json({ result: RES_RESULT.OK, data: games });
      } catch (err) {
        gamesControllerError('sendGames type=location');
        next(err);
      }

      return;
    };

    case 'user': {
      const { id } = res.locals.user;
      const selection = query.selection.toLowerCase();

      switch (selection) {
        case 'history': {

          try {
            const games = await gameService.findByHistory({ ...query, userId: id });
            res.json({ result: RES_RESULT.OK, data: games });
          } catch (err) {
            gamesControllerError('sendGames type=user&selection=history');
          }

          return;
        }

        case 'games': {
          try {
            const games = await gameService.findByUser({ ...query, userId: id });
            res.json({ result: RES_RESULT.OK, data: games });
          } catch (err) {
            gamesControllerError('sendGames type=user&selection=games');
          }

          return;
        }
      }

      res.status(400);
      res.json({
        result: RES_RESULT.FAIL, message: `${selection} is not valid type.`
      });
      return;
    };
  }

  res.status(400);
  res.json({
    result: RES_RESULT.FAIL, message: `${type} is not valid type.`
  });
};

exports.create = async (req, res, next) => {
  const { body } = req;
  const { id } = res.locals.user;

  try {
    const newGame = await gameService.create({ userId: id, body });

    res.status(200);
    res.json({ result: RES_RESULT.OK, data: newGame });
  } catch (err) {
    gamesControllerError('create');
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const { game_id } = req.params;
  const { body } = req;

  try {
    const updatedGame = await gameService.update({ gameId: game_id, body });

    res.status(201);
    res.json({ result: RES_RESULT.OK, data: updatedGame });
  } catch (err) {
    gamesControllerError('create');
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { game_id } = req.params;

  try {
    await gameService.delete({ gameId: game_id });

    res.status(204);
    res.json({ result: RES_RESULT.OK });
  } catch (err) {
    gamesControllerError('create');
    next(err);
  }
};
