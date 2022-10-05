const Streaming = require("../model/Streaming");

exports.getStreamings = async () => {
  try {
    const streamings = await Streaming.find().limit(10).populate("streamer", "email userName thumnail").lean();

    return {
      status: 200,
      message: "Fetch Streamings Success",
      streamings,
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.generateStreaming = async (streamerId, title, thumnail) => {
  try {
    const streaming = await Streaming.create({
      streamer: streamerId,
      title,
      thumnail,
    });

    return {
      status: 201,
      message: "Generate Streaming Success",
      streaming,
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.removeStreaming = async (streamerId) => {
  try {
    await Streaming.deleteMany({ streamer: streamerId });

    return {
      status: 200,
      message: "Remove Streaming Success",
    };
  } catch (err) {
    throw new Error(err);
  }
};
