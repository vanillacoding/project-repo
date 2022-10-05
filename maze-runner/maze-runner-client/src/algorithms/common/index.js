import { NODE_STATUS } from '../../constant';

const sumOfArrayElement = (array1, array2) => [
  array1[0] + array2[0],
  array1[1] + array2[1],
];

export const getNextNodes = (centerNodeId, byId) => {
  const [i, j] = centerNodeId.split('-').map(Number);

  if (typeof i !== 'number' || typeof j !== 'number') {
    throw new Error('getNextNodes parameter(centerNodeId) format error.');
  }

  const nextNodes = [];
  const OFFSET = {
    0: [-1, 0],
    1: [0, 1],
    2: [1, 0],
    3: [0, -1],
  };

  for (let k = 0; k < Object.keys(OFFSET).length; k++) {
    const candidateNodeIndex = sumOfArrayElement([i, j], OFFSET[k]);
    const candidateNodeId = `${candidateNodeIndex[0]}-${candidateNodeIndex[1]}`;
    const candidateNode = byId[candidateNodeId];

    if (candidateNode && candidateNode.status !== NODE_STATUS.WALL) {
      nextNodes.unshift(candidateNode);
    }
  }

  return nextNodes;
};

export const getShortestDistanceNodeId = (unvisitedNodeIdList, byId) => {
  if (!unvisitedNodeIdList.length) {
    return;
  }

  let index = 0;
  let shortestDistanceNodeId = unvisitedNodeIdList[index];

  for (let i = 1; i < unvisitedNodeIdList.length; i++) {
    const nodeId = unvisitedNodeIdList[i];

    if (byId[shortestDistanceNodeId].distance > byId[nodeId].distance) {
      shortestDistanceNodeId = nodeId;
      index = i;
    }
  }

  unvisitedNodeIdList.splice(index, 1);
  return shortestDistanceNodeId;
};

export const getShortestDistanceNodeIdAStar = (unvisitedNodeIdList, byId) => {
  if (!unvisitedNodeIdList.length) {
    return;
  }

  let index = 0;
  let shortestDistanceNodeId = unvisitedNodeIdList[index];

  for (let i = 1; i < unvisitedNodeIdList.length; i++) {
    const nodeId = unvisitedNodeIdList[i];

    if (byId[shortestDistanceNodeId].fDistance > byId[nodeId].fDistance) {
      shortestDistanceNodeId = nodeId;
      index = i;
    } else if (
      byId[shortestDistanceNodeId].fDistance === byId[nodeId].fDistance &&
      byId[shortestDistanceNodeId].hDistance > byId[nodeId].hDistance
    ) {
      shortestDistanceNodeId = nodeId;
      index = i;
    }
  }

  unvisitedNodeIdList.splice(index, 1);
  return shortestDistanceNodeId;
};

export const manhattanDistance = (nextNodeId, targetNodeId) => {
  const [nextY, nextX] = nextNodeId.split('-').map(Number);
  const [targetY, targetX] = targetNodeId.split('-').map(Number);

  return Math.abs(targetY - nextY) + Math.abs(targetX - nextX);
};

export default {
  getNextNodes,
  getShortestDistanceNodeId,
  getShortestDistanceNodeIdAStar,
  manhattanDistance,
};
