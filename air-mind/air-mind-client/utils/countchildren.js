const countChildren = (nodeId, nodeData) => {
  const nodeQueue = [nodeId];
  let count = 0;
  let unFetchedExist = false;

  while (nodeQueue.length > 0) {
    const tempId = nodeQueue.shift();
    if (nodeData[tempId]) {
      const { children } = nodeData[tempId];

      if (children) {
        count += children.length;
        nodeQueue.push(...children);
      }
    } else {
      unFetchedExist = true;
      count -= 1;
    }
  }

  return unFetchedExist ? `${String(count)}+` : String(count);
};

export default countChildren;
