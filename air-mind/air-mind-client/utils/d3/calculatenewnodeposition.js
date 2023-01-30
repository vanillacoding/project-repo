import * as d3 from 'd3';
import NODE_SIZE from '../../constants/nodesize';

const calculateNewNodePosition = (nodeId, headNodeId) => {
  const node = d3.select(`#node${nodeId}`);
  const headNode = d3.select(
    `#node${headNodeId || '634e4e47475c008330626937'}`,
  );

  const nodeCenterX =
    Number(node.attr('x')) + Number(node.selectChild().attr('width')) / 2;
  const nodeCenterY =
    Number(node.attr('y')) + Number(node.selectChild().attr('height')) / 2;

  let increaseX;
  let increaseY;

  if (nodeId === headNodeId) {
    increaseX = 200;
    increaseY = 200;
  } else {
    const headNodeCenterX =
      Number(headNode.attr('x')) +
      Number(headNode.selectChild().attr('width')) / 2;
    const headNodeCenterY =
      Number(headNode.attr('y')) +
      Number(headNode.selectChild().attr('height')) / 2;

    const diffX = nodeCenterX - headNodeCenterX;
    const diffY = nodeCenterY - headNodeCenterY;

    increaseX =
      150 * (diffX / (diffX ** 2 + diffY ** 2) ** 0.5) -
      NODE_SIZE.MEDIUM.width / 2;

    increaseY =
      150 * (diffY / (diffX ** 2 + diffY ** 2) ** 0.5) -
      NODE_SIZE.MEDIUM.height / 2;
  }

  const cordX = nodeCenterX + increaseX;
  const cordY = nodeCenterY + increaseY;

  return { cordX, cordY };
};

export default calculateNewNodePosition;
