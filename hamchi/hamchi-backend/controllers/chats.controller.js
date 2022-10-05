const createError = require('http-errors');
const { chatErrorMessage } = require('../constants/errorMessage');

const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

exports.createChats = async function (req, res, next) {
  try {
    const { ownerId, guestId, message } = req.body;

    const owner = await User.findById(ownerId);
    const guest = await User.findById(guestId);

    const messages = await Message.create({
      messages: [{
        user: {
          id: ownerId,
          name: owner.username
        },
        message: message,
        time: new Date
      }]
    });

    const chat = await Chat.create({
      owner: {
        id: ownerId,
        name: owner.username
      },
      guest: {
        id: guestId,
        name: guest.username
      },
      lastMessage: {
        user: {
          id: ownerId,
          name: owner.username
        },
        message: message,
        time: new Date
      },
      messages: messages._id
    });

    await User.updateMany(
      { _id: { $in: [ownerId, guestId] } },
      { $push: { chats: chat._id } },
      { multi: true }
    );

    res.json({
      code: 200,
      message: 'create chat success',
    });
  } catch (err) {
    next(createError(500, chatErrorMessage.CHAT_CREATE_FAILED));
  }
};

exports.myChats = async function (req, res, next) {
  try {
    const { userId } = req.params;

    const user = await User
      .findById(userId)
      .populate('chats');

    res.json({
      code: 200,
      message: 'my chats fetch success',
      data: { chats: user.chats },
    });
  } catch (err) {
    next(createError(500, chatErrorMessage.CHAT_FETCH_FAILED));
  }
};

exports.getMessages = async function (req, res, next) {
  try {
    const { messageId } = req.params;
    const messages = await Message.findById(messageId);

    res.json({
      code: 200,
      message: 'my chats fetch success',
      data: { messages: messages },
    });
  } catch (err) {
    next(createError(500, chatErrorMessage.MESSAGES_FETCH_FAILED));
  }
};


