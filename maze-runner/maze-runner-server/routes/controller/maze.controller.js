const createError = require('http-errors');
const { ObjectId } = require('mongoose').Types;

const Mazes = require('../../model/mazes');

const ERROR = require('../../constant/error');
const { isValidAlgorithm, isValidBlock } = require('../../util');

const getMaze = async (req, res, next) => {
  try {
    const { mazeId } = req.params;

    const isValidMazeId = ObjectId.isValid(mazeId);

    if (!isValidMazeId) {
      throw createError(400, ERROR.INVALID_MAZE_ID);
    }

    const maze = await Mazes.findById(mazeId).exec();

    if (!maze) {
      throw createError(400, ERROR.NO_MAZE_FOUND);
    }

    const result = maze.toObject();
    delete result._id;

    res.json({ result: 'ok', maze: result });
  } catch (err) {
    next(err);
  }
};

const postMaze = async (req, res, next) => {
  try {
    const { body } = req;
    const hasMazeProperty = Object.prototype.hasOwnProperty.call(body, 'maze');

    if (!hasMazeProperty) {
      throw createError(400, ERROR.INVALID_MAZE_FORMAT);
    }

    const { maze } = body;
    const hasAlgorithmProperty = Object.prototype.hasOwnProperty.call(
      maze,
      'algorithms',
    );
    const hasBlockProperty = Object.prototype.hasOwnProperty.call(
      maze,
      'block',
    );

    if (!hasAlgorithmProperty || !hasBlockProperty) {
      throw createError(400, ERROR.INVALID_MAZE_FORMAT);
    }

    const { algorithms, block } = maze;

    if (!isValidAlgorithm(algorithms)) {
      throw createError(400, ERROR.INVALID_ALGORITHM);
    }

    if (!isValidBlock(block)) {
      throw createError(400, ERROR.INVALID_BLOCK);
    }

    const created = await Mazes.create({
      algorithms,
      block,
    });

    res.json({ result: 'ok', mazeId: created.id.toString() });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMaze, postMaze };
