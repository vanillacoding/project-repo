const User = require('../models/User');
const MindMap = require('../models/MindMap');
const Node = require('../models/Node');

const userData = require('./UserMockData');
const mindMapData = require('./MindMapMockData');
const nodeData = require('./NodeMockData');

const createTestData = async () => {
  try {
    await User.insertMany(userData);
    await MindMap.insertMany(mindMapData);
    await Node.insertMany(nodeData);
    console.log('Data inserted!');
    return 'ok';
  } catch (error) {
    console.error(error);
    return 'error';
  }
};

const deleteTestData = async () => {
  try {
    await User.deleteMany();
    await MindMap.deleteMany();
    await Node.deleteMany();
    console.log('Data cleaned!');
    return 'ok';
  } catch (error) {
    console.error(error);
    return 'error';
  }
};

const backupOriginalData = async () => {
  try {
    const originalUserData = await User.find();
    const originalMindMapData = await MindMap.find();
    const originalNodeData = await Node.find().setOptions({
      autopopulate: false,
    });
    console.log('Data backed up!');
    return {
      originalUserData,
      originalMindMapData,
      originalNodeData,
    };
  } catch (error) {
    console.error(error);
    return 'error';
  }
};

const restoreOriginalData = async backupData => {
  try {
    await User.insertMany(backupData.originalUserData);
    await MindMap.insertMany(backupData.originalMindMapData);
    await Node.insertMany(backupData.originalNodeData);
    console.log('Data restored!');
    return 'ok';
  } catch (error) {
    console.error(error);
    return 'error';
  }
};

module.exports = {
  createTestData,
  deleteTestData,
  backupOriginalData,
  restoreOriginalData,
};
