const Node = require('../../models/Node');

const nodeDeleteHelper = async nodeId => {
  const populatedNodes = await Node.findById(nodeId).setOptions({
    autopopulate: { maxDepth: 5 },
  });

  const populatedQueue = [populatedNodes];
  const unPopulatedList = [];
  const deletedIdList = [];

  while (populatedQueue.length > 0) {
    const tempNode = populatedQueue.shift();

    if (tempNode.children && tempNode.children.length > 0) {
      populatedQueue.push(
        ...tempNode.children.filter(val => {
          if (!val.title) {
            unPopulatedList.push(val);
            return false;
          }

          return true;
        }),
      );
    }

    deletedIdList.push(tempNode.id);
  }

  if (unPopulatedList.length === 0) {
    return deletedIdList;
  }

  const additionalLists = await Promise.all(
    unPopulatedList.map(id => {
      return nodeDeleteHelper(id);
    }),
  );

  return additionalLists.reduce((acc, li) => acc.concat(li), deletedIdList);
};

module.exports = nodeDeleteHelper;
