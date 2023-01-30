const Node = require('../../models/Node');
const MindMap = require('../../models/MindMap');
const User = require('../../models/User');

const getMindMapData = async (req, res, next) => {
  try {
    const { mindMapId } = req.params;
    if (!mindMapId) {
      throw new Error('No mindMapId delivered!!');
    }

    res.locals.mindMap = await MindMap.findById(mindMapId).populate();

    next();
  } catch (error) {
    error.message = `Error in getMindMapData in mindMapDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const putMindMapData = async (req, res, next) => {
  try {
    const { mindMapId } = req.params;
    if (!mindMapId) {
      throw new Error('No mindMapId delivered!!');
    }

    const mindMap = req.body;
    if (!mindMap) {
      throw new Error('No mindMap delivered!!');
    }

    if (!mindMap.title) {
      mindMap.title = 'Untitled';
    }

    const updatedMindMap = await MindMap.findByIdAndUpdate(mindMapId, mindMap, {
      returnOriginal: false,
    });
    res.locals.mindMap = updatedMindMap;

    next();
  } catch (error) {
    error.message = `Error in putMindMapData in mindMapDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const postMindMapData = async (req, res, next) => {
  try {
    const { userId } = res.locals;
    if (!userId) {
      throw new Error('No userId delivered!!');
    }

    const user = await User.findById(userId);
    const mindMap = await MindMap.create({
      author: user,
      access: 'private',
    });

    res.locals.mindMap = mindMap;

    next();
  } catch (error) {
    error.message = `Error in postMindMapData in mindMapDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const deleteMindMapData = async (req, res, next) => {
  try {
    const { mindMapId } = req.params;
    if (!mindMapId) {
      throw new Error('No mindMapId delivered!!');
    }

    await Node.deleteMany({ mindMap: mindMapId });
    await MindMap.deleteOne({ _id: mindMapId });

    next();
  } catch (error) {
    error.message = `Error in deleteMindMapData in mindMapDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const getMindMapAccessData = async (req, res, next) => {
  try {
    const { mindMapId } = req.params;
    if (!mindMapId) {
      throw new Error('No mindMapId delivered!!');
    }

    const mindMap = await MindMap.findById(mindMapId).populate('author');

    res.locals.mindMap = mindMap;
    res.locals.access = mindMap.access;

    next();
  } catch (error) {
    error.message = `Error in getMindMapAccessData in mindMapDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const getMyMindMapList = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new Error('No userId delivered!!');
    }

    const max = (req.query && req.query.max) || 15;
    const access =
      (req.query &&
        (req.query.access === 'mixed'
          ? ['public', 'private']
          : req.query.access)) ||
      'public';

    res.locals.mindMapsList = await MindMap.find({
      author: userId,
      access,
    })
      .sort({ date: -1 })
      .limit(max)
      .populate('author');

    next();
  } catch (error) {
    error.message = `Error in getMyMindMapList in mindMapDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const getPublicMindMapList = async (req, res, next) => {
  try {
    const max = (req.query && req.query.max) || 15;
    res.locals.mindMapsList = await MindMap.find({ access: 'public' })
      .sort({ date: -1 })
      .limit(max)
      .populate('author');

    next();
  } catch (error) {
    error.message = `Error in getPublicMindMapList in mindMapDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const getAllMindMapIdList = async (req, res, next) => {
  try {
    const mindMapList = await MindMap.find();
    res.locals.mindMapIdList = mindMapList.map(mindMap => {
      const { _id: mindMapId } = mindMap;
      return mindMapId;
    });

    next();
  } catch (error) {
    error.message = `Error in getAllMindMapIdList in mindMapDataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

module.exports = {
  getMindMapData,
  putMindMapData,
  postMindMapData,
  deleteMindMapData,
  getMindMapAccessData,
  getMyMindMapList,
  getPublicMindMapList,
  getAllMindMapIdList,
};
