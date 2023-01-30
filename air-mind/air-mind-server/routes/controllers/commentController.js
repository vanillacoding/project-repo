const Node = require('../../models/Node');

const getAllComments = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    if (!nodeId) {
      throw new Error('No nodeId delivered!!');
    }

    const foundedNode = await Node.findById(nodeId).setOptions({
      autopopulate: false,
    });

    if (!foundedNode) {
      const error = new Error('Invalid nodeId!!');
      error.status = 502;
      throw error;
    }

    const responseBody = {};
    responseBody.result = 'ok';
    responseBody.data = foundedNode.comments;

    res.status(200).json(responseBody);
  } catch (error) {
    error.message = `Error in getAllComments in commentController.js : ${error.message}`;

    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    if (!nodeId) {
      throw new Error('No nodeId delivered!!');
    }

    if (!req.body) {
      throw new Error('No comment data delivered!!');
    }

    const { author, content, profile } = req.body;
    const newComment = {
      comments: {
        author,
        content,
        profile,
      },
    };

    const updatedNode = await Node.findOneAndUpdate(
      { _id: nodeId },
      {
        $addToSet: newComment,
      },
      { returnOriginal: false },
    ).setOptions({
      autopopulate: false,
    });

    if (!updatedNode) {
      const error = new Error('Invalid nodeId!!');
      error.status = 502;
      throw error;
    }

    const responseBody = {};
    responseBody.result = 'ok';
    responseBody.data = updatedNode.comments;

    res.status(200).json(responseBody);
  } catch (error) {
    error.message = `Error in createComment in commentController.js : ${error.message}`;

    next(error);
  }
};

module.exports = {
  getAllComments,
  createComment,
};
