const makeAncestors = (nodeId, nodeData) => {
  const ancestors = [];
  let currentId = nodeId;

  while (currentId) {
    ancestors.push(currentId);
    currentId = nodeData[currentId].parent;
  }

  return ancestors;
};

export default makeAncestors;
