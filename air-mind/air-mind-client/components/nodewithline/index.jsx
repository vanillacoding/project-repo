import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Node from '../node';

import NODE_SIZE from '../../constants/nodesize';

export default function NodeWithLine({
  parentNodeId,
  childNodeId,
  nodeData,
  setNodeData,
  socketUsers,
}) {
  const lineRef = useRef();

  const parentNodeData = nodeData[parentNodeId];
  const childNodeData = nodeData[childNodeId];

  let parentX;
  let parentY;
  let parentWidth;
  let parentHeight;
  let childX;
  let childY;
  let childWidth;
  let childHeight;

  if (
    parentNodeData &&
    Object.keys(parentNodeData)?.length > 0 &&
    childNodeData &&
    Object.keys(childNodeData)?.length > 0
  ) {
    ({ cordX: parentX, cordY: parentY } = parentNodeData.attribute);
    ({ cordX: childX, cordY: childY } = childNodeData.attribute);
    ({ width: parentWidth, height: parentHeight } =
      NODE_SIZE[parentNodeData.attribute.size]);
    ({ width: childWidth, height: childHeight } =
      NODE_SIZE[childNodeData.attribute.size]);
  }

  useEffect(() => {
    if (
      parentNodeData &&
      Object.keys(parentNodeData)?.length > 0 &&
      childNodeData &&
      Object.keys(childNodeData)?.length > 0
    ) {
      const line = d3.select(lineRef.current);
      const parentCenter = [
        parentX + parentWidth / 2,
        parentY + parentHeight / 2,
      ];
      const childCenter = [childX + childWidth / 2, childY + childHeight / 2];
      line
        .attr('x1', parentCenter[0])
        .attr('y1', parentCenter[1])
        .attr('x2', childCenter[0])
        .attr('y2', childCenter[1]);
    }
  }, [parentNodeData, childNodeData]);

  return (
    <>
      <line ref={lineRef} style={{ stroke: 'red' }} />
      <Node
        nodeId={childNodeId}
        nodeData={nodeData}
        setNodeData={setNodeData}
        socketUsers={socketUsers}
      />
    </>
  );
}

NodeWithLine.propTypes = {
  parentNodeId: PropTypes.string.isRequired,
  childNodeId: PropTypes.string.isRequired,
  nodeData: PropTypes.object.isRequired,
  setNodeData: PropTypes.func.isRequired,
  socketUsers: PropTypes.array.isRequired,
};
