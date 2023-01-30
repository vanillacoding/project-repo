const mongoose = require("mongoose");
const createError = require("http-errors");

const User = require("../models/User");
const Project = require("../models/Project");
const ERROR = require("../constants/error");

exports.getProjects = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const isUser = await User.exists({ _id: userId });

    if (!isUser) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const projects = await Project.aggregate([
      {
        $match: { creator: mongoose.Types.ObjectId(userId) },
      },
      { $sort: { updatedAt: -1 } },
    ]);

    res.status(200).json({ projects });
  } catch (err) {
    next(err);
  }
};

exports.postProject = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { projectName } = req.body;

    if (!userId || !projectName || projectName.length > 50) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    if (!mongoose.isValidObjectId(userId)) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const project = await Project.create({
      creator: userId,
      name: projectName,
    });

    res.status(201).json({ result: "Success", project });
  } catch (err) {
    next(err);
  }
};
