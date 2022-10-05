import { NODE_STATUS, PROGRESS_RESULT } from '../constant';
import {
  getNextNodes,
  getShortestDistanceNodeIdAStar,
  manhattanDistance,
} from './common';

export const AStar = (byId, startNodeId, targetNodeId) => {
  const unvisitedNodeIdList = Object.keys(byId);
  const animatedNodeIds = [];
  let currentNode = byId[startNodeId];

  currentNode.distance = 0;
  currentNode.fDistance = 0;

  while (unvisitedNodeIdList.length) {
    let currentNodeId = getShortestDistanceNodeIdAStar(
      unvisitedNodeIdList,
      byId,
    );
    currentNode = byId[currentNodeId];

    while (
      currentNode.status === NODE_STATUS.WALL &&
      unvisitedNodeIdList.length
    ) {
      currentNodeId = getShortestDistanceNodeIdAStar(unvisitedNodeIdList, byId);
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

      // NOTE: A* 알고리즘은 Dijkstra에서 hn(휴리스틱)을 추가한 알고리즘이다.
      // A* 알고리즘 평가 함수: fn = gn + hn
      // fDistance = gDistance + hDistance
      // gn: 출발에서 지금(n) 까지의 경로 가중치
      // hn: 지금(n) 부터 목표까지의 경로 가중치 - (n ~ 목표 거리(manhattan 거리) 계산)
      // https://ko.wikipedia.org/wiki/A*_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98

      const gDistance = currentNode.distance + nextNode.weight;

      if (!nextNode.hDistance) {
        nextNode.hDistance = manhattanDistance(nextNode.id, targetNodeId);
      }

      if (gDistance < nextNode.distance) {
        Object.assign(nextNode, {
          distance: gDistance,
          fDistance: gDistance + nextNode.hDistance,
          previousNodeId: currentNode.id,
        });
      }
    });
  }

  return { message: PROGRESS_RESULT.FAILURE, animatedNodeIds };
};

export default AStar;
