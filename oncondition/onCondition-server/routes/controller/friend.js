const createError = require("http-errors");
const mongoose = require("mongoose");

const User = require("../../models/User");
const Activity = require("../../models/Activity");
const Sleep = require("../../models/Sleep");
const Meal = require("../../models/Meal");
const Album = require("../../models/CustomAlbum");
const Grid = require("../../models/CustomGrid");
const Request = require("../../models/Request");

const getISOTime = require("../utils/getISOTime");
const ACCESS_LEVELS = require("../../constants/accessLevels");
const { ERROR } = require("../../constants/messages");
const {
  OK, NOT_FOUND, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR,
} = require("../../constants/statusCodes");

async function getFriends(req, res, next) {
  try {
    const creator = req.creator.id;
    const { friends } = await User.findById(creator).populate("friends",
      "_id name profileUrl stroke scores lastAccessDate").exec();

    const receivedRequests = await Request.aggregate([
      { $match: { receiverId: mongoose.Types.ObjectId(creator) } },
      { $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "sender",
      } },
      { $unwind: { path: "$sender", preserveNullAndEmptyArrays: true } },
      { $project: {
        _id: "$sender._id",
        profileUrl: "$sender.profileUrl",
        name: "$sender.name",
      } },
    ]);

    const sentRequests = await Request.aggregate([
      { $match: { senderId: mongoose.Types.ObjectId(creator) } },
      { $lookup: {
        from: "users",
        localField: "receiverId",
        foreignField: "_id",
        as: "receiver",
      } },
      { $unwind: { path: "$receiver", preserveNullAndEmptyArrays: true } },
      { $project: {
        _id: "$receiver._id",
        profileUrl: "$receiver.profileUrl",
        name: "$receiver.name",
      } },
    ]);

    const data = {
      friends,
      receivedRequests,
      sentRequests,
    };

    res.status(OK);
    res.json({
      result: "ok",
      data,
    });
  } catch (err) {
    next();
  }
}

async function getProfile(req, res, next) {
  try {
    const { creator } = req;

    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw createError(BAD_REQUEST, ERROR.INVALID_FRIEND_ID);
    }

    const friendId = mongoose.Types.ObjectId(req.params.id);

    if (!creator.friends.includes(friendId)) {
      throw createError(NOT_FOUND);
    }

    const friend = await User.findById(friendId);

    if (!friend) {
      next(createError(NOT_FOUND));
    }

    const {
      stroke, scores, lastAccessDate, profileUrl, name,
    } = friend;
    const now = new Date();
    const { pastAMonthAgo } = getISOTime(now);

    const matchOption = {
      creator: friendId,
      date: { $gte: pastAMonthAgo, $lte: now },
    };

    const activity = Activity.aggregate([{ $match: matchOption }, { $addFields: { category: "activity" } }]);
    const meal = Meal.aggregate([{ $match: matchOption }, { $addFields: { category: "meal" } }]);
    const sleep = Sleep.aggregate([{ $match: matchOption }, { $addFields: { category: "sleep" } }]);
    const album = Album.aggregate([{ $match: matchOption }, { $addFields: { type: "album" } }]);
    const grid = Grid.aggregate([{ $match: matchOption }, { $addFields: { type: "grid" } }]);

    const recentDataPerModel = await Promise.all([
      activity, meal, sleep, album, grid,
    ]);

    const data = recentDataPerModel.reduce((data, dataPerModel) => {
      return data.concat(dataPerModel);
    }, []).sort((a, b) => b.date - a.date);

    res.status(OK);
    res.json({
      stroke,
      scores,
      lastAccessDate,
      profileUrl,
      name,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function sendFriendRequest(req, res, next) {
  try {
    const creator = req.creator.id;
    const { friendId } = req.body;

    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      throw createError(BAD_REQUEST, ERROR.INVALID_FRIEND_ID);
    }

    const prevRequest = await Request.findOne({
      receiverId: friendId,
      senderId: creator,
    });

    if (prevRequest) {
      throw createError(BAD_REQUEST, ERROR.INVALID_FRIEND_REQUEST);
    }

    const request = await Request.create({
      receiverId: friendId,
      senderId: creator,
    });

    if (!request) {
      throw createError(INTERNAL_SERVER_ERROR,
        ERROR.UNCLEAR_FINISHED_ADD_FRIEND);
    }

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

async function patchFriendDetail(req, res, next) {
  try {
    const creator = req.creator.id;
    const { id: friendId } = req.params;
    const { isAccepted } = req.body.isAccepted;

    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      throw createError(BAD_REQUEST, ERROR.INVALID_FRIEND_ID);
    }

    const request = await Request.find({
      receiverId: creator,
      senderId: friendId,
    });

    if (!request) {
      throw createError(BAD_REQUEST, ERROR.INVALID_FRIEND_REQUEST);
    }

    if (isAccepted) {
      const receiverResult = User.findByIdAndUpdate(creator, {
        $push: { friends: friendId },
      });

      const senderResult = User.findByIdAndUpdate(friendId, {
        $push: { friends: creator },
      });

      if (!receiverResult || !senderResult) {
        throw createError(INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR);
      }
    }

    const deleteRequest = Request.findByIdAndDelete(request._id);

    if (!deleteRequest) {
      throw createError(INTERNAL_SERVER_ERROR,
        ERROR.UNCLEAR_FINISHED_ADD_FRIEND);
    }

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

async function deleteFriendDetail(req, res, next) {
  const creator = req.creator.id;
  const { id: friendId } = req.params;

  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      throw createError(BAD_REQUEST, ERROR.INVALID_FRIEND_ID);
    }

    const senderResult = await User.findByIdAndUpdate(creator, {
      $pull: { friends: friendId },
    });

    if (!senderResult) {
      throw createError(NOT_FOUND, ERROR.ALREADY_NOT_FRIEND);
    }

    const receiverResult = await User.findByIdAndUpdate(friendId, {
      $pull: { friends: creator },
    });

    if (!receiverResult) {
      throw createError(NOT_FOUND, ERROR.ALREADY_NOT_FRIEND);
    }

    res.status(OK);
    res.json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getFriends,
  getProfile,
  sendFriendRequest,
  patchFriendDetail,
  deleteFriendDetail,
};
