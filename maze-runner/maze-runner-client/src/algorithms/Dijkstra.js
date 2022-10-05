import { NODE_STATUS, PROGRESS_RESULT } from '../constant';
import { getNextNodes, getShortestDistanceNodeId } from './common';

export const Dijkstra = (byId, startNodeId, targetNodeId) => {
  const unvisitedNodeIdList = Object.keys(byId);
  const animatedNodeIds = [];
  let currentNode = byId[startNodeId];

  currentNode.distance = 0;

  while (unvisitedNodeIdList.length) {
    let currentNodeId = getShortestDistanceNodeId(unvisitedNodeIdList, byId);
    currentNode = byId[currentNodeId];

    while (
      currentNode.status === NODE_STATUS.WALL &&
      unvisitedNodeIdList.length
    ) {
      currentNodeId = getShortestDistanceNodeId(unvisitedNodeIdList, byId);
      currentNode = byId[currentNodeId];
    }

    if (currentNode.distance === Infinity) {
      break;
    }

    animatedNodeIds.push(currentNodeId);

    if (currentNodeId === targetNodeId) {
      return { message: PROGRESS_RESULT.SUCCESS, animatedNodeIds };
    }

    const nextNodes = getNextNodes(currentNode.id, byId);

    nextNodes.forEach((nextNode) => {
      if (nextNode.status === NODE_STATUS.WALL) {
        return;
      }

      const newDistance = currentNode.distance + nextNode.weight;

      if (newDistance < nextNode.distance) {
        Object.assign(nextNode, {
          distance: newDistance,
          previousNodeId: currentNode.id,
        });
      }
    });
  }

  return { message: PROGRESS_RESULT.FAILURE, animatedNodeIds };
};

export default Dijkstra;
