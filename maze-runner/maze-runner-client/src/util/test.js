import { NODE_STATUS } from '../constant';
import { createNodes } from './maze';

export function getNodeColIndex(nodeId) {
  if (typeof nodeId !== 'string' && !(nodeId instanceof String)) {
    throw new Error('Node id should be a string');
  }

  if (nodeId.split('-').length !== 2) {
    throw new Error('Invalid node id');
  }

  return nodeId.split('-')[1];
}

export function getNodeRowIndex(nodeId) {
  if (typeof nodeId !== 'string' && !(nodeId instanceof String)) {
    throw new Error('Node id should be a string');
  }

  if (nodeId.split('-').length !== 2) {
    throw new Error('Invalid node id');
  }

  return nodeId.split('-')[0];
}

export function getPrevNodeId(nodeId) {
  if (typeof nodeId !== 'string' && !(nodeId instanceof String)) {
    throw new Error('Node id should be a string');
  }

  if (nodeId.split('-').length < 2) {
    throw new Error('Invalid node id');
  }

  const row = getNodeRowIndex(nodeId);
  const col = getNodeColIndex(nodeId);

  return `${Number(row)}-${Number(col) - 1}`;
}

export function createById(startNodeId, endNodeId) {
  const exampleBlocks = [
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  ];

  const startNodeIndex = {
    col: getNodeColIndex(startNodeId),
    row: getNodeRowIndex(startNodeId),
  };
  const endNodeIndex = {
    col: getNodeColIndex(endNodeId),
    row: getNodeRowIndex(endNodeId),
  };

  exampleBlocks[startNodeIndex.row][startNodeIndex.col] = 3;
  exampleBlocks[endNodeIndex.row][endNodeIndex.col] = 4;

  const [widthCount, heightCount] = [
    exampleBlocks[0].length,
    exampleBlocks.length,
  ];

  const nodes = createNodes(widthCount, heightCount);
  const { byId } = nodes;

  exampleBlocks.forEach((row, rowIndex) =>
    row.forEach((number, colIndex) => {
      const nodeId = `${rowIndex}-${colIndex}`;

      switch (number) {
        case 0: {
          byId[nodeId].status = NODE_STATUS.UNVISITED;
          return;
        }
        case 1: {
          byId[nodeId].status = NODE_STATUS.WALL;
          return;
        }
        case 2: {
          byId[nodeId].status = NODE_STATUS.WEIGHTED;
          byId[nodeId].weight = 10;
          return;
        }
        case 3: {
          byId[nodeId].status = NODE_STATUS.START;
          return;
        }
        case 4: {
          byId[nodeId].status = NODE_STATUS.END;
          return;
        }
        case 5: {
          byId[nodeId].status = NODE_STATUS.MIDDLE;
          return;
        }
        default: {
          return;
        }
      }
    }),
  );

  return byId;
}

export default {
  getNodeColIndex,
  getNodeRowIndex,
  getPrevNodeId,
  createById,
};
