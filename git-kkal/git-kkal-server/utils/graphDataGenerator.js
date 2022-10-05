const GRAPH_COLOR_LIST = require('../constants/graphColorPalette');

const deleteDeactivatedPipe = (
  activatedPipeList,
  activatedPipeRootList,
  log,
  exceptionList
) => {
  let clonedActivatedPipeList = [...activatedPipeList];
  const clonedActivatedPipeRootList = [...activatedPipeRootList];

  const newPipeRootIndex = clonedActivatedPipeRootList.findIndex(
    (branchPoint) => branchPoint.newPipeRootHash === log.hash
  );

  if (newPipeRootIndex !== -1) {
    const pipeListToBeRemoved =
      clonedActivatedPipeRootList[newPipeRootIndex].connectedPipe;
    pipeListToBeRemoved.forEach((pipeToBeRemoved) => {
      let isReturn = false;

      const findIndex = clonedActivatedPipeList.findIndex(
        (pipeNumber) => pipeNumber === pipeToBeRemoved
      );
      exceptionList.forEach((ex) => {
        if (ex === findIndex) {
          isReturn = true;
        }
      });

      if (isReturn) return;

      clonedActivatedPipeList = clonedActivatedPipeList.filter(
        (branchPosition) => branchPosition !== pipeToBeRemoved
      );
    });

    clonedActivatedPipeRootList.splice(newPipeRootIndex, 1);
  }
  return {
    activatedPipeList: clonedActivatedPipeList,
    activatedPipeRootList: clonedActivatedPipeRootList,
  };
};

const cleanUpActivatedPipeRootList = (
  activatedPipeList,
  activatedPipeRootList,
  log
) => {
  const clonedActivatedPipeRootList = [...activatedPipeRootList];

  const newPipeRootIndex = clonedActivatedPipeRootList.findIndex(
    (branchPoint) => branchPoint.newPipeRootHash === log.hash
  );
  if (newPipeRootIndex !== -1) {
    clonedActivatedPipeRootList.splice(newPipeRootIndex, 1);
  }

  return {
    activatedPipeList,
    activatedPipeRootList: clonedActivatedPipeRootList,
  };
};

const addHeadProperty = (logListData) => {
  const logList = logListData.map((log) => {
    const { hash, branchNames: branch, parents } = log;

    const newLog = {
      ...log,
      head: false,
      parents: parents.split(' '),
    };

    if (parents === '') {
      newLog.parents = [];
    }

    if (branch.length) {
      for (let i = 0; i < logListData.length; i += 1) {
        if (logListData[i].parents.includes(hash)) {
          return newLog;
        }
      }

      return {
        ...newLog,
        head: true,
      };
    }

    return newLog;
  });

  logList[logList.length - 1].parents = [];

  return logList;
};

const addColorProperty = (position) => {
  const color = GRAPH_COLOR_LIST[position % GRAPH_COLOR_LIST.length];
  return color;
};

const deleteAbnormalPipe = (log, activatedPipeList, nodeData) => {
  const pipeIndexToBeRemoved = nodeData.filter((targetNode) => {
    let result = false;
    targetNode.parents.forEach((parent) => {
      result = parent === log.hash;
    });
    return result;
  })[0].position;

  const clonedActivatedPipeList = [...activatedPipeList];

  clonedActivatedPipeList.splice(pipeIndexToBeRemoved, 1);
  return clonedActivatedPipeList;
};

const addPositionProperty = (
  logList,
  initialActivatedPipeList,
  initialActivatedPipeRootList
) => {
  const logHistoryObject = {};
  logList.forEach((log) => {
    logHistoryObject[log.hash] = log;
  });

  const modifiedGraphData = logList.reduce(
    (acc, log, index, clonedLogList) => {
      const { clonedNodeDataList } = acc;
      let { nextPipeLineIndex, maxPipeCount } = acc;
      const { head, parents } = log;

      const hasPosition = clonedNodeDataList[index]?.position;
      const tempPosition =
        hasPosition &&
        acc.activatedPipeList.findIndex(
          (number) => number === clonedNodeDataList[index].position
        );
      const exceptionList = [tempPosition];
      const count = hasPosition
        ? [...clonedLogList[index].count]
            .map((pos) => {
              if (pos < 0) {
                if (Math.abs(pos) < tempPosition) {
                  exceptionList.push(Math.abs(pos));
                  return 1;
                }
                return 0;
              }
              return 1;
            })
            .reduce((sum, cur) => sum + cur, 0)
        : 0;

      const { activatedPipeList, activatedPipeRootList } =
        count < 2
          ? cleanUpActivatedPipeRootList(
              acc.activatedPipeList,
              acc.activatedPipeRootList,
              log
            )
          : deleteDeactivatedPipe(
              acc.activatedPipeList,
              acc.activatedPipeRootList,
              log,
              exceptionList
            );

      maxPipeCount = Math.max(activatedPipeList.length, maxPipeCount);

      if (head) {
        const newPosition = nextPipeLineIndex;
        activatedPipeList.push(newPosition);
        nextPipeLineIndex += 1;

        clonedNodeDataList[index] = {
          ...clonedLogList[index],
          position: newPosition,
        };
      }

      if (parents.length === 0 && clonedLogList.length !== index) {
        const tempActivatedPipeList = deleteAbnormalPipe(
          log,
          activatedPipeList,
          clonedNodeDataList
        );
        clonedNodeDataList[index].position = activatedPipeList.findIndex(
          (number) => number === clonedNodeDataList[index].position
        );

        clonedNodeDataList[index].color = addColorProperty(
          clonedNodeDataList[index].position
        );
        return {
          clonedNodeDataList,
          activatedPipeList: tempActivatedPipeList,
          activatedPipeRootList,
          nextPipeLineIndex,
          maxPipeCount,
        };
      }

      const position = activatedPipeList.findIndex(
        (number) => number === clonedNodeDataList[index].position
      );

      if (parents.length === 1) {
        const samePipeParentIndex = logHistoryObject[parents[0]].index;
        clonedLogList[samePipeParentIndex].count.add(position);
        if (!clonedNodeDataList[samePipeParentIndex]) {
          clonedNodeDataList[samePipeParentIndex] = {
            ...clonedLogList[samePipeParentIndex],
            position: clonedNodeDataList[index].position,
          };

          activatedPipeRootList.push({
            newPipeRootHash: parents[0],
            connectedPipe: [clonedNodeDataList[samePipeParentIndex].position],
            index,
          });
        } else {
          const targetIndex = activatedPipeRootList.findIndex(
            (target) => target.newPipeRootHash === parents[0]
          );

          if (targetIndex < 0) {
            activatedPipeRootList.push({
              newPipeRootHash: parents[0],
              connectedPipe: [
                Math.max(
                  clonedNodeDataList[index].position,
                  clonedNodeDataList[samePipeParentIndex].position
                ),
              ],
              index,
            });
          } else {
            activatedPipeRootList[targetIndex].connectedPipe.push(
              clonedNodeDataList[index].position
            );
          }

          clonedNodeDataList[samePipeParentIndex].position = Math.min(
            clonedNodeDataList[samePipeParentIndex].position,
            clonedNodeDataList[index].position
          );
        }
      } else if (parents.length === 2) {
        const samePipeParentIndex = logHistoryObject[parents[0]].index;
        const otherPipeParentIndex = logHistoryObject[parents[1]].index;

        if (!clonedNodeDataList[samePipeParentIndex]) {
          clonedNodeDataList[samePipeParentIndex] = {
            ...clonedLogList[samePipeParentIndex],
            position: clonedNodeDataList[index].position,
          };

          activatedPipeRootList.push({
            newPipeRootHash: parents[0],
            connectedPipe: [clonedNodeDataList[index].position],
            index,
          });
        } else {
          const targetIndex = activatedPipeRootList.findIndex(
            (target) => target.newPipeRootHash === parents[0]
          );

          if (targetIndex < 0) {
            activatedPipeRootList.push({
              newPipeRootHash: parents[0],
              connectedPipe: [clonedNodeDataList[index].position],
              index,
            });
          } else {
            activatedPipeRootList[targetIndex].connectedPipe.push(
              clonedNodeDataList[index].position
            );
          }

          clonedNodeDataList[samePipeParentIndex].position = Math.min(
            clonedNodeDataList[samePipeParentIndex].position,
            clonedNodeDataList[index].position
          );
        }

        if (!clonedNodeDataList[otherPipeParentIndex]) {
          const newPosition = nextPipeLineIndex;
          nextPipeLineIndex += 1;
          activatedPipeList.push(newPosition);

          clonedNodeDataList[otherPipeParentIndex] = {
            ...clonedLogList[otherPipeParentIndex],
            position: newPosition,
          };
        }

        clonedLogList[samePipeParentIndex].count.add(position);
        clonedLogList[otherPipeParentIndex].count.add(-position);
      }

      clonedNodeDataList[index].position = activatedPipeList.findIndex(
        (number) => number === clonedNodeDataList[index].position
      );

      if (clonedNodeDataList[index].position < 0) {
        clonedNodeDataList[index].position = 1;
      }

      clonedNodeDataList[index].color = addColorProperty(
        clonedNodeDataList[index].position
      );

      return {
        clonedNodeDataList,
        activatedPipeList,
        activatedPipeRootList,
        nextPipeLineIndex,
        maxPipeCount,
      };
    },
    {
      clonedNodeDataList: [],
      activatedPipeList: initialActivatedPipeList,
      activatedPipeRootList: initialActivatedPipeRootList,
      nextPipeLineIndex: 1,
      maxPipeCount: 0,
    }
  );

  return {
    logList: modifiedGraphData.clonedNodeDataList.map((nodeData) => {
      const clonedNodeData = { ...nodeData };
      delete clonedNodeData.count;
      return clonedNodeData;
    }),
    maxPipeCount: modifiedGraphData.maxPipeCount,
  };
};

const modifyFormat = (logListData) => {
  const logList = logListData.map((log, index) => {
    const logClone = { ...log };
    const branchName =
      log.branchNames === ''
        ? null
        : log.branchNames.trim().slice(1).slice(0, -1).split(',');
    logClone.index = index;
    logClone.branchNames = branchName;
    logClone.count = new Set();
    return logClone;
  });

  return logList;
};

const graphDataGenerator = (logListData) => {
  const logListWithHead = addHeadProperty(logListData);
  const modifiedLogList = modifyFormat(logListWithHead);

  const initialActivatedPipeList = [];
  const initialActivatedPipeRootList = [];

  const { logList, maxPipeCount } = addPositionProperty(
    modifiedLogList,
    initialActivatedPipeList,
    initialActivatedPipeRootList
  );

  return { logList, maxPipeCount };
};

module.exports = graphDataGenerator;
