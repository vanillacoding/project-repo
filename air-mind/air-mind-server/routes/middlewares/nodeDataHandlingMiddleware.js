const Node = require('../../models/Node');
const MindMap = require('../../models/MindMap');

const nodeDeleteHelper = require('../lib/nodeDeleteHelper');

const getNodeData = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    if (!nodeId) {
      throw new Error('No nodeId delivered!');
    }
    res.locals.nodesNestedObject = await Node.findById(nodeId).setOptions({
      autopopulate: { maxDepth: 5 },
    });

    next();
  } catch (error) {
    error.message = `Error in getNodeData in nodeDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const putNodeData = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    if (!nodeId) {
      throw new Error('No nodeId delivered!');
    }

    const node = req.body;
    if (!node) {
      throw new Error('No data for update delivered!');
    }

    const updatedNode = await Node.findByIdAndUpdate(nodeId, node, {
      returnOriginal: false,
    }).setOptions({
      autopopulate: false,
    });
    res.locals.updatedNode = updatedNode;

    next();
  } catch (error) {
    error.message = `Error in putNodeData in nodeDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const postNodeData = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    if (!nodeId) {
      throw new Error('No nodeId delivered!');
    }

    const node = req.body;
    if (!node) {
      throw new Error('No data for update delivered!');
    }

    const parentNode = await Node.findById(nodeId).setOptions({
      autopopulate: false,
    });
    const childNode = await Node.create(node);

    if (!parentNode) {
      throw new Error('No parent node error!!');
    }

    if (!Array.isArray(parentNode.children)) {
      throw new Error('Invalid parent node data referred!!');
    }

    childNode.mindMap = parentNode.mindmap;
    childNode.parent = parentNode.id;
    parentNode.children.push(childNode.id);

    await childNode.save();
    await parentNode.save();

    res.locals.childNode = childNode;
    next();
  } catch (error) {
    error.message = `Error in postNodeData in nodeDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const deleteNodeData = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    if (!nodeId) {
      throw new Error('No nodeId delivered!');
    }

    const { parent: parentId } = await Node.findById(nodeId).setOptions({
      autopopulate: false,
    });
    if (!parentId) {
      throw new Error('No parent node exists!!');
    }

    const updateParentTarget = await Node.findById(parentId).setOptions({
      autopopulate: false,
    });

    const childrenList = updateParentTarget.children;
    if (!Array.isArray(childrenList)) {
      throw new Error('Invalid parent node data referred!!');
    }

    const childIndex = childrenList.indexOf(nodeId);
    if (childIndex === -1) {
      throw new Error("Target node not exists in parent's children list!!");
    }

    childrenList.splice(childIndex, 1);
    updateParentTarget.children = childrenList;
    const deleteTarget = await nodeDeleteHelper(nodeId);

    await updateParentTarget.save();
    await Node.deleteMany({ _id: deleteTarget });

    next();
  } catch (error) {
    error.message = `Error in deleteNodeData in nodeDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const postHeadNodeData = async (req, res, next) => {
  try {
    const { mindMap } = res.locals;
    if (!mindMap) {
      throw new Error('No mind map delivered!!');
    }

    const childNode = await Node.create({
      attribute: {
        cordX: 500,
        cordY: 300,
      },
    });

    childNode.mindMap = mindMap.id;
    mindMap.headNode = childNode.id;

    await childNode.save();
    await mindMap.save();

    res.locals.childNode = childNode;
    next();
  } catch (error) {
    error.message = `Error in postHeadNodeData in nodeDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const makePlainObject = (req, res, next) => {
  try {
    if (!res.locals.nodesNestedObject) {
      throw new Error('No nodes data delivered!!');
    }

    const nestedObjectQueue = [res.locals.nodesNestedObject];
    const plainObject = {};
    let nodeCount = (req.query && req.query.max) || 30;

    while (nestedObjectQueue.length > 0 && nodeCount > 0) {
      const tempObject = nestedObjectQueue.shift();

      if (
        tempObject.children &&
        tempObject.children.length > 0 &&
        Object.keys(tempObject.children[0]).length > 0
      ) {
        nestedObjectQueue.push(...tempObject.children);

        tempObject.children = tempObject.children.map(child => child.id);
      }

      plainObject[tempObject.id] = tempObject;

      nodeCount -= 1;
    }

    res.locals.nodesPlainObject = plainObject;

    next();
  } catch (error) {
    error.message = `Error in makePlainObject in nodeDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const isPublicNode = async (req, res, next) => {
  try {
    const { mindMapId } = res.locals;
    if (!mindMapId) {
      throw new Error('No mindMapId delivered!!');
    }

    const mindMap = await MindMap.findById(mindMapId);

    if (mindMap.access === 'public') {
      const responseBody = {};

      responseBody.result = 'ok';
      responseBody.node = res.locals.nodesPlainObject;
      responseBody.count = Object.keys(responseBody.node).length;

      res.status(200).json(responseBody);
      return;
    }

    next();
  } catch (error) {
    error.message = `Error in isPublicNode in nodeDataHandlingMiddleware : ${error.message}`;

    next(error);
  }
};

const postImageDataInNode = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    if (!nodeId) {
      throw new Error('No nodeId delivered!!');
    }

    const images = res.req.files;
    if (!images || images.length === 0) {
      throw new Error('No images data delivered!!');
    }

    const updatedNode = await Node.findById(nodeId).setOptions({
      autopopulate: false,
    });

    if (updatedNode.images.length + images.length > 10) {
      const error = new Error(
        'The maximum number of images has been exceeded.',
      );
      error.status = 400;
      next(error);
      return;
    }

    const newImages = [];
    images.forEach(image => {
      const imageData = {
        path: image.location,
        originalName: image.originalname,
      };

      newImages.push(imageData);
    });

    updatedNode.images.push(...newImages);
    await updatedNode.save();

    res.locals.updatedNode = updatedNode;
    next();
  } catch (error) {
    error.message = `Error in postImageDataInNode in nodeDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const deleteImageDataInNode = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    if (!nodeId) {
      throw new Error('No nodeId delivered!!');
    }

    const { path: imagePath } = req.body;
    if (!imagePath) {
      throw new Error('No target image path delivered!!');
    }

    const targetNode = await Node.findById(nodeId).setOptions({
      autopopulate: false,
    });

    targetNode.images = targetNode.images.filter(
      image => image.path !== imagePath,
    );

    await targetNode.save();

    res.locals.updatedNode = targetNode;
    next();
  } catch (error) {
    error.message = `Error in deleteImageDataInNode in nodeDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

module.exports = {
  getNodeData,
  putNodeData,
  postNodeData,
  deleteNodeData,
  postHeadNodeData,
  makePlainObject,
  isPublicNode,
  postImageDataInNode,
  deleteImageDataInNode,
};
