const createError = require("http-errors");

const Artist = require("../../models/Artist");

const getArtistsBySpecific = async (req, res, next) => {
  try {
    const { query } = req;
    let option = [];

    if (Array.isArray(query)) {
      option = Object.values(query)[0].map(value => ({
        [Object.keys(query)[0]]: value,
      }));
    } else {
      option = [query];
    }

    const artists = await Artist.find({
      $or: option,
    });

    res
      .status(200)
      .json({ reesult: "success", artists });
  } catch {
    next(createError(400, "아티스트 정보를 받지 못했습니다."));
  }
};

module.exports = {
  getArtistsBySpecific,
};
