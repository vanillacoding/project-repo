const mongoose = require('mongoose');

const Chat = require('../../models/Chat');
const { VliveError, InvalidDataError } = require('../../lib/errors');

exports.getChat = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const chat = await Chat.findOne({ channelId }).lean();

    res.send({
      result: 'ok',
      data: chat ? chat.chatList : [],
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new InvalidDataError());
    }

    next(new VliveError());
  }
};

exports.addChat = async (req, res, next) => {
  try {
    const { channelId, input } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { channelId },
      { $push: { chatList: input } },
      { new: true },
    );

    if (!chat) {
      return await Chat.create({
        channelId,
        chatList: [input],
      });
    }

    res.json({ result: 'ok' });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new InvalidDataError());
    }

    next(new VliveError());
  }
};
