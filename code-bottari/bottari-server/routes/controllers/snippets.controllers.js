const mongoose = require("mongoose");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const Snippet = require("../../models/Snippet");
const Hashtag = require("../../models/Hashtag");
const User = require("../../models/User");

const { snippetStorage } = require("../../config/connectSlack");

const {
  INVALID_ID,
  INVALID_REQUEST,
  NO_AUTHORITY_TO_ACCESS,
  NOT_FOUND,
  UNEXPECTED_ERROR,
  UNPROCESSABLE_ENTITY,
  OK,
} = require("../../constants/messages");

const {
  ADD,
  REMOVE,
} = require("../../constants/names");

const getSnippetList = async (req, res, next) => {
  const { userId } = req.params;
  const { search, language, sort } = req.query;
  const { page } = req.body;

  const skipValue = (page - 1) * 10;

  const hashtagList = search?.split(" ");

  const targets = {};

  userId && (targets.poster = userId);
  language && (targets.language = language);
  hashtagList && (targets.hashtagList = { $all: hashtagList });

  const sortType = {};

  try {
    const snippetList = await Snippet
      .find(targets)
      .sort({ createdAt: -1 })
      .populate(["creator", "poster"])
      .skip(skipValue)
      .limit(10);

    res
      .status(200)
      .send({ result: OK, snippetList });
  } catch (error) {
    next(error);
  }
};

const shareSnippet = async (req, res, next) => {
  const { userId, language, code, hashtags } = req.body;
  try {
    const user = await User.findById(userId);

    if (user === null) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    const { nickname } = user;
    snippetStorage[nickname] = { language, code, hashtags };

    res
      .status(200)
      .send({ result: OK });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const getUserSnippetList = async (req, res, next) => {
  const { id: userId } = req.params;

  try {
    const snippetList = await Snippet.find({ "poster": { "_id": `${userId}` } }).populate(["creator", "poster"]);

    res
      .status(200)
      .send({ result: OK, snippetList });
  } catch (error) {
    next(error);
  }
};

const getSnippet = async (req, res, next) => {
  const { id } = req.params;

  try {
    const snippet = await Snippet
      .findById(id)
      .populate(["creator", "poster", "commentList.creator"]);

    const isInvalid = snippet === null;

    if (isInvalid) {
      throw createError(404, INVALID_ID);
    }

    res.send({ result: OK, snippet });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    if (error instanceof mongoose.Error.CastError) {
      next(createError(422, INVALID_REQUEST));

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const deleteSnippet = async (req, res, next) => {
  const { id: snippetId } = req.body;
  const { auth: token } = req.cookies;

  const userId = jwt.decode(token);

  try {
    const snippet = await Snippet.findById(snippetId);

    if (snippet === null) {
      throw createError(404, NOT_FOUND);
    }

    const { poster } = snippet;

    if (String(poster) !== userId) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    const deleteSnippet = await Snippet.findByIdAndDelete(snippetId, { new: true });

    const { hashtagList } = deleteSnippet;
    const transformedHashtagList = Array.from(hashtagList, (hashtag) => ({ name: hashtag }));
    const targets = { $or: transformedHashtagList };

    const matchedHashtags = await Hashtag.find(targets);

    const deleteSnippetId = async (hashtag) => {
      const { snippetList } = hashtag;

      const index = snippetList.findIndex((targetId) => String(targetId) === String(snippetId));

      const hasHashtag = index !== -1;

      if (!hasHashtag) {
        return;
      }

      snippetList.splice(index, 1);

      await hashtag.save();
    };

    const promises = matchedHashtags.map(async (hashtag) => await deleteSnippetId(hashtag));

    await Promise.all(promises);

    res.send({ result: OK });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const createSnippet = async (req, res, next) => {
  const { creator, poster, language, code, hashtagList } = req.body;
  const { auth: token } = req.cookies;

  const userId = jwt.decode(token);

  try {
    const inValidUser = String(userId) !== String(poster);

    if (inValidUser) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    const createdSnippet = await Snippet.create({
      creator,
      poster,
      language,
      code,
      hashtagList,
    });

    const transformedHashtagList = Array.from(hashtagList, (hashtag) => ({ name: hashtag }));
    const targets = { $or: transformedHashtagList };

    const matchedHashtags = await Hashtag.find(targets);

    matchedHashtags.forEach(async (hashtag) => {
      hashtag.snippetList.push(createdSnippet._id);
      await hashtag.save();
    });

    const matchedHashtagNames = matchedHashtags.map((hashtag) => hashtag.name);
    const unmatchedHashtags = transformedHashtagList.filter((hashtag) => !matchedHashtagNames.includes(hashtag.name));

    if (unmatchedHashtags.length) {
      const createHashtagList = Array.from(unmatchedHashtags, (hashtag) => {
        hashtag.snippetList = createdSnippet._id;

        return hashtag;
      });

      await Hashtag.insertMany(createHashtagList);
    }

    res.send({ result: OK, snippet: createdSnippet });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const handleLikeData = async (req, res, next) => {
  const { id: targetId } = req.params;
  const { taskType } = req.body;
  const { auth: token } = req.cookies;

  const userId = jwt.decode(token);

  try {
    if (taskType === undefined) {
      throw createError(422, UNPROCESSABLE_ENTITY);
    }

    const targetSnippet = await Snippet.findById(targetId);

    const hasSnippetData = targetSnippet !== null;

    if (!hasSnippetData) {
      throw createError(404, NOT_FOUND);
    }

    const { likerList } = targetSnippet;

    const hasUserId = likerList.includes(userId);

    if (taskType === ADD && !hasUserId) {
      likerList.push(userId);
    }

    if (taskType === REMOVE && hasUserId) {
      const index = likerList.findIndex((likerId) => String(likerId) === String(userId));

      likerList.splice(index, 1);
    }

    await targetSnippet.save();

    res
      .status(200)
      .send({ result: OK, likerNumber: likerList.length });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const createComment = async (req, res, next) => {
  const { userId, snippetId, comment } = req.body;
  const { auth: token } = req.cookies;

  const decodedId = jwt.decode(token);

  try {
    const inValidUser = String(userId) !== String(decodedId);

    if (inValidUser) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    await Snippet.findByIdAndUpdate(
      snippetId,
      { $push: { commentList: { creator: userId, content: comment, createdAt: Date.now() } } },
      { new: true }
    );

    res
      .status(200)
      .send({ result: OK });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const deleteComment = async (req, res, next) => {
  const { userId, commentId, snippetId } = req.body;
  const { auth: token } = req.cookies;

  const decodedId = jwt.decode(token);

  try {
    const inValidUser = String(userId) !== String(decodedId);

    if (inValidUser) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    await Snippet.findByIdAndUpdate(
      snippetId,
      { $pull: { commentList: { _id: commentId } } },
      { new: true }
    );

    res
      .status(200)
      .send({ result: OK });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const updateComment = async (req, res, next) => {
  const { userId, snippetId, commentId, content } = req.body;
  const { auth: token } = req.cookies;

  const decodedId = jwt.decode(token);

  try {
    const inValidUser = String(userId) !== String(decodedId);

    if (inValidUser) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    const isInvalid = userId === undefined || snippetId === undefined;

    if (isInvalid) {
      throw createError(422, INVALID_REQUEST);
    }

    await Snippet.findOneAndUpdate(
      { _id: snippetId, "commentList._id": commentId },
      { "commentList.$.content": content }
    );

    res
      .status(200)
      .send({ result: OK });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

module.exports = {
  getSnippetList,
  shareSnippet,
  getUserSnippetList,
  getSnippet,
  deleteSnippet,
  createSnippet,
  handleLikeData,
  createComment,
  deleteComment,
  updateComment,
};
