const mongoose = require('mongoose');

const Episode = require('../../models/Episode');
const Channel = require('../../models/Channel');
const {
  VliveError,
  InvalidDataError,
  ExistingDataError,
  BadRequestError,
} = require('../../lib/errors');

exports.getChannels = async (_, res, next) => {
  try {
    const channels = await Channel.find().lean().populate('episode');

    res.status(200).json({
      result: 'ok',
      data: channels,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new InvalidDataError());
    }

    next(new VliveError());
  }
};

exports.getChannel = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId)
      .populate('episode')
      .populate('host')
      .populate({
        path: 'players',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
      .populate({
        path: 'players',
        populate: {
          path: 'character',
          model: 'Character',
        },
      });

    res.json({
      result: 'ok',
      data: channel,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new InvalidDataError());
    }

    next(new VliveError());
  }
};

exports.createChannel = async (req, res, next) => {
  try {
    const { name, episodeId, host } = req.body;

    if (await Channel.exists({ name })) {
      return next(new ExistingDataError());
    }

    const episode = await Episode.findById(episodeId);
    const newChannel = await Channel.create({
      name,
      episode,
      host,
    });

    res.json({
      result: 'ok',
      data: newChannel,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new InvalidDataError());
    }

    next(new VliveError());
  }
};

exports.updateChannel = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const { state, userId, characterId, playerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return next(new BadRequestError());
    }

    const targetChannel = await Channel.findById(channelId);

    if (targetChannel === null) {
      next(new VliveError());
    }

    const { players } = targetChannel;

    switch (state) {
      case 'voting': {
        const user = targetChannel.players.find(
          ({ _id }) => _id.toString() === playerId,
        );

        user.voteCount++;

        break;
      }

      case 'enter': {
        players.push({ user: userId });

        break;
      }

      case 'exit': {
        targetChannel.players = players.filter(
          (player) => player.user.toString() !== userId,
        );

        break;
      }

      case 'start': {
        targetChannel.isPlaying = true;

        break;
      }

      case 'end': {
        targetChannel.isActive = false;
        res.json({ result: 'ok' });

        break;
      }

      case 'character': {
        const player = players.find(
          (player) => player.user.toString() === userId,
        );
        player.character = characterId;

        break;
      }
    }

    await targetChannel.save();

    res.json({
      result: 'ok',
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new InvalidDataError());
    }

    next(new VliveError());
  }
};
