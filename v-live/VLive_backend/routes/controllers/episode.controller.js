const mongoose = require('mongoose');

const Episode = require('../../models/Episode');
const { InvalidDataError, VliveError } = require('../../lib/errors');

exports.getEpisodes = async (_, res, next) => {
  try {
    const episodes = await Episode.find();

    res.json({
      result: 'ok',
      data: episodes,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new InvalidDataError());
    }

    next(new VliveError());
  }
};

exports.getEpisode = async (req, res, next) => {
  try {
    const { episodeId } = req.params;
    const episode = await Episode.findById(episodeId).populate('characters');

    res.json({
      result: 'ok',
      data: episode,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new InvalidDataError());
    }

    next(new VliveError());
  }
};
