const createError = require("http-errors");

const Genre = require("../../models/Genre");

const getAll = async (_, res, next) => {
  try {
    const genres = await Genre.find();

    res
      .status(200)
      .json({ result: "success", genres });
  } catch {
    next(createError(400, "장르 정보를 받는데 실패했습니다."));
  }
};

module.exports = {
  getAll,
};
