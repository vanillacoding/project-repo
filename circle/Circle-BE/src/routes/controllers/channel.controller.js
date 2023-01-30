const mongoose = require("mongoose");
const createError = require("http-errors");

const Project = require("../../../models/Project");
const Channel = require("../../../models/Channel");

const { MESSAGE, LIMITED_CHANNEL_COUNT } = require("../../constants");

const { LIMITED_CHANNEL, BAD_REQUEST, SUCCESS } = MESSAGE;

const createChannel = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { title, description, isActive } = req.body;
    const { projectId } = req.params;
    const channelId = mongoose.Types.ObjectId();

    if (!mongoose.isValidObjectId(projectId)) {
      return next(createError(400, BAD_REQUEST));
    }

    const selectedProject = await Project
      .findById(projectId)
      .populate("channels")
      .exec();

    const channelCount = selectedProject.channels.length;
    if (channelCount >= LIMITED_CHANNEL_COUNT) {
      return next(createError(423, LIMITED_CHANNEL));
    }

    await session.withTransaction(async () => {
      const newChannel = {
        _id: channelId,
        title,
        description,
        isActive,
      };

      await Channel.create([newChannel], { session });
      await Project
        .findByIdAndUpdate(
          projectId,
          { $push: { channels: channelId } },
          { session },
        )
        .exec();
    });

    return res.json({ id: channelId });
  } catch (error) {
    return next(error);
  } finally {
    session.endSession();
  }
};

const editChannel = async (req, res, next) => {
  try {
    const { title, description, isActive } = req.body;
    const { channelId } = req.params;

    if (!mongoose.isValidObjectId(channelId)) {
      return next(createError(400, BAD_REQUEST));
    }

    await Channel
      .findByIdAndUpdate(channelId, {
        title,
        description,
        isActive,
      })
      .exec();

    return res.json({ result: SUCCESS });
  } catch (error) {
    return next(error);
  }
};

const deleteChannel = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { projectId, channelId } = req.params;

    if (
      !mongoose.isValidObjectId(projectId)
      || !mongoose.isValidObjectId(channelId)
    ) {
      return next(createError(400, BAD_REQUEST));
    }

    await session.withTransaction(async () => {
      await Channel
        .findByIdAndDelete(channelId, { session })
        .exec();
      await Project
        .findByIdAndUpdate(
          projectId,
          { $pull: { channels: channelId } },
          { session },
        )
        .exec();
    });

    return res.json({ result: SUCCESS });
  } catch (error) {
    return next(error);
  } finally {
    session.endSession();
  }
};

module.exports = {
  createChannel,
  editChannel,
  deleteChannel,
};
