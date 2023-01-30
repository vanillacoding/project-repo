import React from 'react';

import Node from '../../components/node';
import NodeWithLine from '../../components/nodewithline';

const makeNodeComponentList = (
  nodeData,
  setNodeData,
  headNode,
  decidedSocketUser,
) => {
  const nodeComponentList = [];
  const nodeQueue = [];

  nodeComponentList.push(
    <Node
      key={headNode}
      nodeId={headNode}
      nodeData={nodeData}
      setNodeData={setNodeData}
      socketUsers={decidedSocketUser[headNode] || []}
    />,
  );

  if (nodeData[headNode]?.attribute.isFold === false) {
    nodeQueue.push(...nodeData[headNode].children);
  }

  while (nodeQueue.length > 0) {
    const tempNode = nodeQueue.shift();

    if (nodeData[tempNode]) {
      const tempParentNode = nodeData[tempNode].parent;

      if (nodeData[tempNode].attribute.isFold === false) {
        nodeQueue.push(...nodeData[tempNode].children);
      }

      nodeComponentList.unshift(
        <NodeWithLine
          key={tempNode}
          parentNodeId={tempParentNode}
          childNodeId={tempNode}
          nodeData={nodeData}
          setNodeData={setNodeData}
          socketUsers={decidedSocketUser[tempNode] || []}
        />,
      );
    }
  }

  return nodeComponentList;
};

export default makeNodeComponentList;
