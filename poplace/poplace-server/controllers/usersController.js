const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const mongoose = require("mongoose");

const { ERROR } = require("../constants");
const User = require("../models/User");
const validateNickname = require("../utils/validateNickname");

const SECRET_KEY = process.env.SECRET_KEY;
const AWS_REGION = process.env.AWS_REGION;
const IDENTITY_POOL_ID = process.env.IDENTITY_POOL_ID;
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

exports.login = async function (req, res, next) {
  const { email } = req.body;

  try {
    const token = jwt.sign({ email }, SECRET_KEY);
    const originalMember = await User.findOne({ email }).lean();

    if (originalMember) {
      const { _id: id, nickname, image, pushAlarmStatus } = originalMember;

      return res.json({
        id,
        token,
        nickname,
        image,
        pushAlarmStatus,
        isOriginalMember: true,
      });
    }

    const user = await User.create({ email });
    const { _id: id } = user;

    return res.json({
      id,
      token,
      nickname: null,
      image: null,
      pushAlarmStatus: true,
      isOriginalMember: false,
    });
  } catch (err) {
    next(err);
  }
};

exports.signup = async function (req, res, next) {
  const { email, nickname } = req.body;
  const { buffer, originalname } = req.files.photo[0];
  const date = Date.now().toString();
  const nicknameValidation = validateNickname(nickname);

  if (!nicknameValidation.isValid) {
    return next(createError(400, nicknameValidation.message));
  }

  AWS.config.update({
    region: AWS_REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL_ID,
    }),
  });

  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: `profiles/${date}_${originalname}`,
    ACL: "public-read",
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: "image/jpg",
  };

  const s3 = new AWS.S3();

  try {
    const sameNickname = await User.findOne({ nickname }).lean();

    if (sameNickname) {
      return next(createError(400, ERROR.sameNickname));
    }

    await User.findOneAndUpdate({ email }, { nickname });

    s3.upload(params, async (err, data) => {
      if (err) {
        next(err);
      } else {
        await User.findOneAndUpdate({ email }, { image: data.Location });

        res.json({ status: "OK" });
      }
    });
  } catch (err) {
    if (err.name === "MongoError") {
      return next(createError(500, ERROR.server));
    }

    if (err instanceof mongoose.Error.ValidationError) {
      return next(createError(500, ERROR.server));
    }

    next(err);
  }
};

exports.delete = async function (req, res, next) {
  const { id } = req.body;

  try {
    await User.findByIdAndDelete(id);

    next();
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  const { id } = req.body;

  try {
    await User.findByIdAndDelete(id);
    next();
  } catch (err) {
    next(err);
  }
};
