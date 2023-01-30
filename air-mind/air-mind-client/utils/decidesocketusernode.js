const decideSocketUserNode = (nodeData, socketUserData) => {
  const decided = {};

  Object.keys(socketUserData).forEach(user => {
    const list = socketUserData[user].nodeAncestorList;
    const { profile } = socketUserData[user];

    let i = 0;

    while (i < list.length) {
      const nodeId = list[i];
      if (nodeData[nodeId]) {
        if (decided[nodeId]) {
          decided[nodeId].push(profile);
          break;
        }

        decided[nodeId] = [profile];
        break;
      }
      i += 1;
    }
  });

  return decided;
};

export default decideSocketUserNode;
