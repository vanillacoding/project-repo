import { NODE_STATUS, PROGRESS_RESULT } from '../constant';
import { getNextNodes } from './common';

export const BFS = (byId, startNodeId, targetNodeId) => {
  const stack = [byId[startNodeId]];
  const visitedNodeObject = {};
  const animatedNodeIds = [];

  while (stack.length) {
    const currentNode = stack.shift();

    animatedNodeIds.push(currentNode.id);

    if (currentNode.id === targetNodeId) {
      return { message: PROGRESS_RESULT.SUCCESS, animatedNodeIds };
    }

    const nextNodes = getNextNodes(currentNode.id, byId);

    nextNodes.forEach((nextNode) => {
      const isVisitedNode = Object.prototype.hasOwnProperty.call(
        visitedNodeObject,
        nextNode.id,
      );

      if (!isVisitedNode) {
        visitedNodeObject[nextNode.id] = NODE_STATUS.VISITED;
        byId[nextNode.id].previousNodeId = currentNode.id;
        stack.push(byId[nextNode.id]);
      }
    });
  }

  return { message: PROGRESS_RESULT.FAILURE, animatedNodeIds };
};

export default BFS;
