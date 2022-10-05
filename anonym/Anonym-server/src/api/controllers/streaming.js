const StreamingService = require("../../services/streaming");

exports.getStreamings = async (req, res, next) => {
  try {
    const { status, message, streamings } = await StreamingService.getStreamings();

    res.status(status).json({
      message,
      payload: streamings,
    });
  } catch (err) {
    next(err);
  }
};

exports.generateStreaming = async (req, res, next) => {
  try {
    const { streamingTitle, streamingThumnail } = req.body;
    const { id: streamingId } = req.params;
    const {
      status,
      message,
      streaming,
    } = await StreamingService.generateStreaming(streamingId, streamingTitle, streamingThumnail);

    res.status(status).json({
      message,
      payload: streaming,
    });
  } catch (err) {
    next(err);
  }
};

exports.removeStreaming = async (req, res, next) => {
  try {
    const { id: streamingId } = req.params;
    const { status, message } = await StreamingService.removeStreaming(streamingId);

    res.status(status).json({
      message,
    });
  } catch (err) {
    next(err);
  }
};
