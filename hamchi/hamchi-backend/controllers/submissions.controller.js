const createError = require('http-errors');
const { submissionErrorMessage } = require('../constants/errorMessage');

const s3 = require('../loaders/s3');
const User = require('../models/User');
const Submissions = require('../models/Submission');
const Post = require('../models/Post');

exports.mySubmissions = async function (req, res, next) {
  try {
    const { userId } = req.params;

    const user = await User
      .findById(userId)
      .populate({
        path: 'submissions',
        model: 'Submission',
        populate: {
          path: 'postId',
          model: 'Post',
          select: ['name', 'image', 'status']
        }
      });

    res.json({
      code: 200,
      message: 'my submission fetch success',
      data: { submissions: user.submissions },
    });
  } catch (err) {
    next(createError(500));
  }
}

exports.createSubmission = async function (req, res, next) {
  try {
    const {
      userId,
      username,
      photo,
      experience,
      location,
      details,
      postId
    } = req.body;

    const user = await User.findById(userId)
      .populate({
        path: 'submissions',
        match: { postId: postId }
      });

    if (user.submissions.length) {
      return next(createError(500, submissionErrorMessage.SUBMISSION_ALREADY_EXIST));
    }

    const buffer = Buffer.from(photo.base64, "base64");
    const params = {
      Bucket: 'hamchi-images',
      Key: Date.now() + new Date().toISOString(),
      Body: buffer,
      ACL: 'public-read',
      ContentEncoding: "base64",
      ContentType: "image/jpg",
    };

    const imageUrl = await s3.upload(params).promise();
    const createdAt = Date.now();

    const createdSubmission = await Submissions.create({
      owner: userId,
      ownerName: username,
      environment: imageUrl.Location,
      experience,
      location,
      details,
      createdAt,
      postId,
      matched: 'false',
    });

    await User.updateOne(
      { _id: userId },
      { $push: { submissions: createdSubmission._id } }
    );

    await Post.updateOne(
      { _id: postId },
      { $push: { submissions: createdSubmission._id } }
    );

    res.json({
      code: 200,
      message: 'create submission success',
      data: {
        submission: createdSubmission
      },
    });
  } catch (err) {
    next(createError(500, submissionErrorMessage.SUBMISSION_CREATE_FAILED));
  }
};

exports.updateSubmissionStatus = async function (req, res, next) {
  try {
    const { submissionIds } = req.body;
    await Submissions.updateMany(
      { _id: { $in: submissionIds } },
      { $set: { matched: 'true' } }
    );

    res.json({
      code: 200,
      message: 'update submission success',
    });
  } catch (err) {
    next(createError(500, err));
  }
};
