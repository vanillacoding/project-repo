import { NODE_STATUS, PROGRESS_RESULT } from '../constant';
import { getNextNodes } from './common';

export const DFS = (byId, startNodeId, targetNodeId) => {
  const stack = [byId[startNodeId]];
  const visitedNodeObject = {};
  const animatedNodeIds = [];

  while (stack.length) {
    const currentNode = stack.pop();

    const isVisitedNode = Object.prototype.hasOwnProperty.call(
      visitedNodeObject,
      currentNode.id,
    );

    if (isVisitedNode) {
      continue;
    }

    animatedNodeIds.push(currentNode.id);

    visitedNodeObject[currentNode.id] = NODE_STATUS.VISITED;

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
        byId[nextNode.id].previousNodeId = currentNode.id;
        stack.push(byId[nextNode.id]);
      }
    });
  }

  return { message: PROGRESS_RESULT.FAILURE, animatedNodeIds };
};

export default DFS;
