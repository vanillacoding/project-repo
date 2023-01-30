const deleteNodeHelper = (nodeId, nodeData, setNodeData) => {
  const tempData = { ...nodeData };

  const headNode = { ...tempData[tempData[nodeId].parent] };
  const deleteChildIndex = headNode.children.indexOf(nodeId);
  const headChildren = [...headNode.children];

  headChildren.splice(deleteChildIndex, 1);
  headNode.children = headChildren;
  tempData[tempData[nodeId].parent] = headNode;

  const nodeQueue = [nodeId];

  while (nodeQueue.length > 0) {
    const tempNodeId = nodeQueue.shift();

    if (nodeData[tempNodeId]) {
      nodeQueue.push(...nodeData[tempNodeId].children);
      delete tempData[tempNodeId];
    }
  }

  setNodeData(tempData);
};

export default deleteNodeHelper;
