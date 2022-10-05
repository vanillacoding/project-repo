const createError = require("http-errors");
const Puzzle = require("../models/Puzzle");
const Password = require("../models/Password");

exports.getPuzzles = async (req, res, next) => {
  try {
    const puzzles = await Puzzle.find();

    res.status(200).json({
      result: "ok",
      data: puzzles
    });
  } catch (err) {
    next(createError(500, "Can't get puzzles"));
  }
};

exports.getPasswords = async (req, res, next) => {
  try {
    const passwords = await Password.find();

    res.status(200).json({
      result: "ok",
      data: passwords
    });
  } catch (err) {
    next(createError(500, "Can't get passwords"));
  }
};
