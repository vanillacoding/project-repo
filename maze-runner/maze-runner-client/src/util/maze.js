import DFS from '../algorithms/DFS';
import BFS from '../algorithms/BFS';
import Dijkstra from '../algorithms/Dijkstra';
import AStar from '../algorithms/AStar';
import {
  ALGORITHM,
  CALC_NUMBERS,
  NODE_PROPERTY,
  NODE_STATUS,
  NODE_STATUS_LIST,
  PROGRESS_RESULT,
  SPEED_MS,
} from '../constant';
import { MAZE } from '../constant/maze';
import {
  headerHeight,
  nodeInfoHeight,
  selectedOptionInfoHeight,
} from '../common/sizes.module.css';
import {
  drawMazeNode,
  endAnimation,
  markPathNode,
  startAnimation,
  visitNode,
} from '../features/maze/mazeSlice';

const HEADER_HEIGHT_REM = parseInt(headerHeight.slice(0, -3), 10) || 10;
const MAZE_DESC_HEIGHT_REM =
  parseInt(nodeInfoHeight.slice(0, -3), 10) +
    parseInt(selectedOptionInfoHeight.slice(0, -3), 10) || 8;
const REM_TO_PX = 16;

export const calcMazeBlockCount = (widthPx, heightPx) => {
  const widthCount =
    (widthPx - MAZE.MAZE_SIDE_MARGIN_PX * MAZE.DOUBLE) / MAZE.BLOCK_SIZE_PX;
  const heightCount =
    (heightPx -
      REM_TO_PX * (HEADER_HEIGHT_REM + MAZE_DESC_HEIGHT_REM) -
      MAZE.MARGIN_BOTTOM_PX) /
    MAZE.BLOCK_SIZE_PX;

  return {
    widthCount: parseInt(widthCount, 10),
    heightCount: parseInt(heightCount, 10),
  };
};

const calcNewNodeStatus = (indexes, size) => {
  const { rowIndex, colIndex } = indexes;
  const { widthCount, heightCount } = size;

  if (
    rowIndex === parseInt(heightCount * CALC_NUMBERS.HALF, 10) &&
    colIndex === parseInt(widthCount * CALC_NUMBERS.QUARTER, 10)
  ) {
    return 'start';
  }

  if (
    rowIndex === parseInt(heightCount * CALC_NUMBERS.HALF, 10) &&
    colIndex ===
      parseInt(widthCount * CALC_NUMBERS.TRIPLE * CALC_NUMBERS.QUARTER, 10)
  ) {
    return 'end';
  }

  return 'unvisited';
};

export const createNodes = (widthCount, heightCount, weight = 1) => {
  const nodes = { byId: {}, allIds: [] };

  for (let i = 0; i < heightCount; i++) {
    const newRowIds = [];

    for (let j = 0; j < widthCount; j++) {
      const newNodeId = `${i}-${j}`;
      const newNodeStatus = calcNewNodeStatus(
        { rowIndex: i, colIndex: j },
        { widthCount, heightCount },
      );

      const newNode = {
        id: newNodeId,
        status: newNodeStatus,
        previousNodeId: null,
        distance: Infinity,
        fDistance: Infinity,
        hDistance: null,
        weight,
      };

      nodes.byId[newNodeId] = newNode;
      newRowIds.push(newNodeId);
    }
    nodes.allIds.push(newRowIds);
  }

  return nodes;
};

export const updateNodes = (node, block, weightValue) => {
  block.forEach((row) => {
    row.forEach((number) => {
      switch (number) {
        case 0: {
          Object.assign(node, {
            status: NODE_STATUS.UNVISITED,
          });
          break;
        }
        case 1: {
          Object.assign(node, {
            status: NODE_STATUS.WALL,
          });
          break;
        }
        case 2: {
          Object.assign(node, {
            status: NODE_STATUS.WEIGHTED,
            weight: weightValue,
          });
          break;
        }
        case 3: {
          Object.assign(node, {
            status: NODE_STATUS.START,
          });
          break;
        }
        case 4: {
          Object.assign(node, {
            status: NODE_STATUS.END,
          });
          break;
        }
        case 5: {
          Object.assign(node, {
            status: NODE_STATUS.MIDDLE,
          });
          break;
        }
      }
    });
  });
};

export const isFeatNode = (nodeStatus) => {
  if (typeof nodeStatus !== 'string') {
    throw new Error(
      'Type of param of isFeatNode function have to be a string.',
    );
  }

  if (nodeStatus === NODE_STATUS.START) {
    return true;
  }
  if (nodeStatus === NODE_STATUS.MIDDLE) {
    return true;
  }
  if (nodeStatus === NODE_STATUS.END) {
    return true;
  }

  return false;
};

export const calcPathNodeIds = (animatedNodeIds, byId, beginNodeStatus) => {
  const animatedPathNodeIds = [];

  animatedPathNodeIds.push(animatedNodeIds[animatedNodeIds.length - 1]);

  let currentNodeId = animatedPathNodeIds[0];
  let currentNode = byId[currentNodeId];

  while (currentNode.previousNodeId && currentNode.status !== beginNodeStatus) {
    currentNodeId = currentNode.previousNodeId;
    currentNode = byId[currentNodeId];

    if (currentNode.status !== beginNodeStatus) {
      animatedPathNodeIds.push(currentNodeId);
    }
  }

  return animatedPathNodeIds;
};

export const resetNodeProperties = (node, options) => {
  if (!Array.isArray(options)) {
    throw new Error('resetNodeProperties options parameter must be an array');
  }

  const resetObj = options.reduce((obj, cur) => {
    switch (cur) {
      case NODE_PROPERTY.STATUS: {
        obj.status = NODE_STATUS.UNVISITED;
        return obj;
      }
      case NODE_PROPERTY.DISTANCE: {
        obj.distance = Infinity;
        obj.fDistance = Infinity;
        obj.hDistance = null;
        return obj;
      }
      case NODE_PROPERTY.WEIGHT: {
        obj.weight = 1;
        return obj;
      }
      case NODE_PROPERTY.PREVIOUS_NODE_ID: {
        obj.previousNodeId = null;
        return obj;
      }
      case 'All': {
        obj.status = NODE_STATUS.UNVISITED;
        obj.distance = Infinity;
        obj.weight = 1;
        obj.previousNodeId = null;
        return obj;
      }
      default: {
        return obj;
      }
    }
  }, {});

  Object.assign(node, resetObj);
};

export const setNodeProperties = (node, obj) => {
  if (typeof obj !== 'object') {
    throw new Error('setNodeProperties obj parameter must be an object');
  }

  const hasStatus = Object.prototype.hasOwnProperty.call(obj, 'status');

  if (hasStatus) {
    const isValidStatus = NODE_STATUS_LIST.includes(obj.status);

    if (!isValidStatus) {
      throw new Error('setNodeProperties obj has invalid status', obj.status);
    }
  }

  const hasDistance = Object.prototype.hasOwnProperty.call(obj, 'distance');

  if (hasDistance) {
    const isValidDistance = typeof obj.distance === 'number';

    if (!isValidDistance) {
      throw new Error(
        'setNodeProperties obj has invalid distance - distance should be a number type',
      );
    }
  }

  const hasWeight = Object.prototype.hasOwnProperty.call(obj, 'weight');

  if (hasWeight) {
    const isValidWeight = typeof obj.weight === 'number';

    if (!isValidWeight) {
      throw new Error(
        'setNodeProperties obj has invalid weight - weight should be a number type',
      );
    }
  }

  const hasPreviousNodeId = Object.prototype.hasOwnProperty.call(
    obj,
    'previousNodeId',
  );

  if (hasPreviousNodeId) {
    const isValidPreviousNodeId = typeof obj.weight === 'string';

    if (!isValidPreviousNodeId) {
      throw new Error(
        'setNodeProperties obj has invalid weight - weight should be a string type',
      );
    }
  }

  Object.assign(node, obj);
};

export const changeToWallNode = (targetNode) => {
  setNodeProperties(targetNode, {
    status: NODE_STATUS.WALL,
  });
  resetNodeProperties(targetNode, [
    NODE_PROPERTY.DISTANCE,
    NODE_PROPERTY.PREVIOUS_NODE_ID,
    NODE_PROPERTY.WEIGHT,
  ]);
};

export const changeToWeightNode = (targetNode, weight) => {
  setNodeProperties(targetNode, {
    status: NODE_STATUS.WEIGHTED,
    weight,
  });
  resetNodeProperties(targetNode, [
    NODE_PROPERTY.DISTANCE,
    NODE_PROPERTY.PREVIOUS_NODE_ID,
  ]);
};

export const changeToMiddleNode = (targetNode) => {
  setNodeProperties(targetNode, {
    status: NODE_STATUS.MIDDLE,
  });
  resetNodeProperties(targetNode, [
    NODE_PROPERTY.DISTANCE,
    NODE_PROPERTY.PREVIOUS_NODE_ID,
    NODE_PROPERTY.WEIGHT,
  ]);
};

const addPathNodeIdsToResultObject = (obj, byId, beginNodeStatus) => {
  if (obj.message === PROGRESS_RESULT.SUCCESS) {
    const animatedPathNodeIds = calcPathNodeIds(
      obj.animatedNodeIds,
      byId,
      beginNodeStatus,
    );
    obj.animatedPathNodeIds = animatedPathNodeIds;
  }
};

export const runAlgorithm = (
  algorithmName,
  startNodeId,
  middleNodeId,
  endNodeId,
  nodes,
) => {
  const result = {};

  if (middleNodeId) {
    resetAllNodeProperties(nodes);
    const route1 = getAlgorithmFunctionByName(algorithmName)(
      nodes.byId,
      startNodeId,
      middleNodeId,
    );
    addPathNodeIdsToResultObject(route1, nodes.byId, NODE_STATUS.START);

    const route1AnimatedPathNodeIds =
      route1.message === PROGRESS_RESULT.SUCCESS
        ? [...route1.animatedPathNodeIds]
        : [];

    resetAllNodeProperties(nodes);
    const route2 = getAlgorithmFunctionByName(algorithmName)(
      nodes.byId,
      middleNodeId,
      endNodeId,
    );
    addPathNodeIdsToResultObject(route2, nodes.byId, NODE_STATUS.MIDDLE);

    const route2AnimatedPathNodeIds =
      route2.message === PROGRESS_RESULT.SUCCESS
        ? [...route2.animatedPathNodeIds]
        : [];

    result.animatedNodeIds = [
      ...route1.animatedNodeIds,
      '/', // divide route type
      ...route2.animatedNodeIds,
    ];
    result.animatedPathNodeIds = [
      ...route2AnimatedPathNodeIds,
      '/', // divide route type
      ...route1AnimatedPathNodeIds,
    ];

    result.message =
      route1.message === PROGRESS_RESULT.SUCCESS &&
      route2.message === PROGRESS_RESULT.SUCCESS
        ? PROGRESS_RESULT.SUCCESS
        : PROGRESS_RESULT.FAILURE;
  } else {
    resetAllNodeProperties(nodes);
    const route = getAlgorithmFunctionByName(algorithmName)(
      nodes.byId,
      startNodeId,
      endNodeId,
    );
    addPathNodeIdsToResultObject(route, nodes.byId, NODE_STATUS.START);

    result.message = route.message;
    result.animatedNodeIds = route.animatedNodeIds;
    result.animatedPathNodeIds =
      route.message === PROGRESS_RESULT.SUCCESS
        ? route.animatedPathNodeIds
        : [];
  }

  return result;
};

export const resetAllNodeProperties = (nodes) => {
  nodes.allIds.forEach((row) => {
    row.forEach((id) => {
      const currentNode = nodes.byId[id];

      if (currentNode.status !== NODE_STATUS.WEIGHTED) {
        resetNodeProperties(currentNode, [
          NODE_PROPERTY.DISTANCE,
          NODE_PROPERTY.PREVIOUS_NODE_ID,
          NODE_PROPERTY.WEIGHT,
        ]);
      } else {
        resetNodeProperties(currentNode, [
          NODE_PROPERTY.DISTANCE,
          NODE_PROPERTY.PREVIOUS_NODE_ID,
        ]);
      }
    });
  });
};

export const getAlgorithmFunctionByName = (name) => {
  switch (name) {
    case ALGORITHM.DFS: {
      return DFS;
    }
    case ALGORITHM.BFS: {
      return BFS;
    }
    case ALGORITHM.DIJKSTRA: {
      return Dijkstra;
    }
    case ALGORITHM.A_STAR_SEARCH: {
      return AStar;
    }
    default: {
      return () => {};
    }
  }
};

export const mazeInfoToData = (mazeInfo) => {
  const { maze, algorithm } = mazeInfo;
  const dataFormat = {
    maze: {
      algorithms: [algorithm],
      block: [],
    },
  };

  maze.nodes.allIds.forEach((row) => {
    const rowArray = [];

    row.forEach((id) => {
      const node = maze.nodes.byId[id];
      switch (node.status) {
        case NODE_STATUS.UNVISITED:
        case NODE_STATUS.VISITED:
        case NODE_STATUS.VISITED2:
        case NODE_STATUS.PATH:
        case NODE_STATUS.PATH2: {
          rowArray.push(0);
          break;
        }
        case NODE_STATUS.WALL: {
          rowArray.push(1);
          break;
        }
        case NODE_STATUS.WEIGHTED: {
          rowArray.push(2);
          break;
        }
        case NODE_STATUS.START: {
          rowArray.push(3);
          break;
        }
        case NODE_STATUS.END: {
          rowArray.push(4);
          break;
        }
        case NODE_STATUS.MIDDLE: {
          rowArray.push(5);
          break;
        }
        default:
          throw new Error('Invalid node');
      }
    });
    dataFormat.maze.block.push(rowArray);
  });

  return dataFormat;
};

export const animateVisitNodes = (
  dispatch,
  setAnimationTimeoutId,
  animatedNodeIds,
  animatedPathNodeIds,
  animationSpeed,
) => {
  if (!animatedNodeIds.length) {
    return;
  }

  function animateNext(animatedNodeIds, animatedPathNodeIds) {
    const nodeId = animatedNodeIds[0];
    const pathNodeId = animatedPathNodeIds[animatedPathNodeIds.length - 1];

    if (!nodeId && !pathNodeId) {
      dispatch(endAnimation());
      return;
    }

    if (nodeId) {
      dispatch(visitNode(nodeId));

      animatedNodeIds.shift();

      return setTimeout(() => {
        const timeoutId = animateNext(animatedNodeIds, animatedPathNodeIds);

        dispatch(setAnimationTimeoutId(timeoutId));
      }, SPEED_MS[animationSpeed]);
    }

    if (pathNodeId) {
      dispatch(markPathNode(pathNodeId));

      animatedPathNodeIds.pop();

      return setTimeout(() => {
        const timeoutId = animateNext(animatedNodeIds, animatedPathNodeIds);

        dispatch(setAnimationTimeoutId(timeoutId));
      }, SPEED_MS[animationSpeed]);
    }
  }

  dispatch(startAnimation());
  const animationTimeoutId = animateNext(
    [...animatedNodeIds],
    [...animatedPathNodeIds],
  );
  dispatch(setAnimationTimeoutId(animationTimeoutId));
};

export const animatePathNodes = (
  dispatch,
  setAnimationTimeoutId,
  animatedMazeNodeIds,
  animationSpeed,
) => {
  if (!animatedMazeNodeIds.length) {
    return;
  }

  const animatedMazeNodeIdsCopy = animatedMazeNodeIds.slice();

  function animateNext(animatedMazeNodeIds) {
    const nodeId = animatedMazeNodeIds[0];

    if (!nodeId) {
      dispatch(endAnimation());
      return;
    }

    dispatch(drawMazeNode({ nodeId }));

    animatedMazeNodeIds.shift();

    return setTimeout(() => {
      const timeoutId = animateNext(animatedMazeNodeIds);

      dispatch(setAnimationTimeoutId(timeoutId));
    }, SPEED_MS[animationSpeed]);
  }

  dispatch(startAnimation());
  const animationTimeoutId = animateNext(animatedMazeNodeIdsCopy);
  dispatch(setAnimationTimeoutId(animationTimeoutId));
};

export default {
  calcMazeBlockCount,
  createNodes,
  isFeatNode,
  calcPathNodeIds,
  resetNodeProperties,
  setNodeProperties,
  changeToWallNode,
  changeToWeightNode,
  changeToMiddleNode,
  runAlgorithm,
  mazeInfoToData,
};
