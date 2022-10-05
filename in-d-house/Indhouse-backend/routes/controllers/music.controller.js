const createError = require("http-errors");

const Music = require("../../models/Music");
const Artist = require("../../models/Artist");
const Genre = require("../../models/Genre");

const getMusicByLikeGenre = async (req, res, next) => {
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

    const musics = await Music.find({
      $or: option,
    });

    res
      .status(200)
      .json({ result: "success", musics });
  } catch {
    next(createError(400, "음악 정보를 가져오지 못했습니다."));
  }
};

const getMusicBySpecific = async (req, res, next) => {
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

    const musics = await Music.find({
      $or: option,
    });

    res
      .status(200)
      .json({ result: "success", musics });
  } catch {
    next(createError(400, "음악 정보를 가져오지 못했습니다."));
  }
};

const createMusic = async (req, res, next) => {
  try {
    const { music } = req.body;
    let artist;
    let genre;

    artist = await Artist.findOne({ name: music.artist });
    genre = await Genre.findOne({ name: music.genre });

    const isExist = await Music.findOne({ title: music.title });

    if (isExist && JSON.stringify(isExist.artist) === JSON.stringify(artist._id)) {
      res
        .status(200)
        .json({ error: "이미 있는 음악입니다." });
      return;
    }

    if (!genre) {
      genre = await Genre.create({
        name: music.genre,
      });
    }

    if (!artist) {
      artist = await Artist.create({
        name: music.artist,
      });
    }

    await Music.create({
      ...music,
      artist: artist._id,
      genre: genre._id,
    });

    res
      .status(201)
      .json({ result: "success" });
  } catch {
    next(createError(400, "음악 생성에 실패 했습니다."));
  }
};

const uploadCoverPhoto = async (req, res, next) => {
  try {
    const { location } = req.file;

    res
      .status(201)
      .json({ result: "success", location });
  } catch {
    next(createError(400, "음악 커버 사진 업로드에 실패했습니다."));
  }
};

const updateLikeUser = async (req, res, next) => {
  try {
    const { music_id } = req.params;
    const { user_id } = req.params;
    const { type } = req.query;

    const date = new Date();

    if (type === "like") {
      const user = {
        userId: user_id,
        createdAt: date,
      };

      await Music.findByIdAndUpdate(music_id, {
        $push: {
          likeUser: user,
        },
      });
    }

    if (type === "dislike") {
      await Music.findByIdAndUpdate(music_id, {
        $pull: {
          likeUser: {
            userId: {
              $eq: user_id,
            },
          },
        },
      });
    }

    res
      .status(200)
      .json({ result: "success" });
  } catch (err) {
    next(createError(400, err));
  }
};

module.exports = {
  getMusicByLikeGenre,
  getMusicBySpecific,
  createMusic,
  uploadCoverPhoto,
  updateLikeUser,
};
