const createError = require("http-errors");
const mongoose = require("mongoose");

const Glossary = require("../models/Glossary");
const Keyword = require("../models/Keyword");
const User = require("../models/User");

const createHttpError = require("../utils/createHttpError");
const { USER, RESULT } = require("../constants/responseMessages");
const { SIGNUP, SERVER } = require("../constants/error");

const signup = async (req, res, next) => {
  const { email, name, keywords, glossary: glossaryInput } = req.body;

  try {
    const isExist = await User.exists({ email });

    if (isExist) {
      throw createHttpError(401, SIGNUP.REGISTERED_USER, 2003);
    }

    const user = await User.create({ email, name });

    if (!user) {
      throw createHttpError(500, SIGNUP.CANNOT_CREATE_USER, 2000);
    }

    const glossary = await Glossary.create({
      user,
      wordPairs: glossaryInput,
      keywords,
    });

    if (!glossary) {
      throw createHttpError(500, SIGNUP.CANNOT_CREATE_GLOSSARY, 2001);
    }

    const keywordsFound = await Promise.allSettled(
      keywords.map((keywordName) =>
        Keyword.findOne({ name: keywordName }).exec(),
      ),
    );

    const keywordsCreated = keywordsFound.map((result, index) => {
      const keyword = result.value;

      if (keyword) {
        keyword.glossaries.push(glossary.id);
        return keyword.save();
      }

      return Keyword.create({
        name: keywords[index],
        glossaries: [glossary.id],
      });
    });

    const results = await Promise.allSettled(keywordsCreated);

    results.forEach((result) => {
      if (result.status === "rejected") {
        throw createHttpError(
          500,
          SIGNUP.CANNOT_CREATE_OR_UPDATE_KEYWORD,
          2002,
        );
      }
    });

    return res.json({ result: RESULT.OK, glossaryId: glossary.id });
  } catch (error) {
    if (error instanceof createError.HttpError) {
      return next(error);
    }

    if (error instanceof mongoose.Error) {
      return next(createHttpError(500, SERVER.INTERNAL_ERROR, 1009));
    }

    return next(createHttpError(500, SERVER.INTERNAL_ERROR, 1009));
  }
};

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).lean().exec();
    const glossary = await Glossary.findOne({ user: user ? user._id : null })
      .lean()
      .exec();

    const result = {
      result: RESULT.OK,
      isUser: !!user,
      glossaryId: glossary ? glossary._id : null,
      message: user ? USER.FOUND : USER.NOT_FOUND,
    };

    return res.json(result);
  } catch (error) {
    return next(createHttpError(500, SERVER.INTERNAL_ERROR, 1009));
  }
};

const findGlossary = async (req, res, next) => {
  const { user_id: email } = req.params;

  try {
    const user = await User.findOne({ email }).lean().exec();
    const glossary = await Glossary.findOne({ user: user._id }).lean().exec();

    if (!glossary) {
      return res.json({
        result: RESULT.OK,
        data: null,
      });
    }

    return res.json({
      result: RESULT.OK,
      data: glossary.wordPairs,
    });
  } catch (error) {
    return next(createHttpError(500, SERVER.INTERNAL_ERROR, 1009));
  }
};

module.exports = {
  signup,
  login,
  findGlossary,
};
