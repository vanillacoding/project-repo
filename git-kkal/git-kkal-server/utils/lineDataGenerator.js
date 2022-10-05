const INTERVAL = 50;

const convertGraphPosition = (position) => position * INTERVAL;

const lineDataGenerator = (logListData) => {
  const SLOPE = 20;
  const logListObject = {};
  logListData.forEach((log) => {
    logListObject[log.hash] = log;
  });

  const lineData = logListData.map((node, index) => {
    const from = [
      convertGraphPosition(node.position - 1),
      convertGraphPosition(index),
    ];
    const rawLineData = node.parents.map((parent, _, parentsClone) => {
      const parentNode = logListObject[parent];
      const to = [
        convertGraphPosition(parentNode.position - 1),
        convertGraphPosition(parentNode.index),
      ];
      const color =
        node.position > parentNode.position ? node.color : parentNode.color;
      const singleLineData = { color, points: [from] };
      if (parentNode.position > node.position) {
        const checkPoint = [to[0], from[1] + SLOPE];
        singleLineData.points.push(checkPoint);
      } else if (parentNode.position < node.position) {
        if (parentsClone.length === 1) {
          const checkPoint = [from[0], to[1] - SLOPE];
          singleLineData.points.push(checkPoint);
        } else {
          if (((from[0] + to[0]) / 2) % INTERVAL === 0) {
            const checkPoint1 = [(from[0] + to[0]) / 4, from[1] + SLOPE];
            const checkPoint2 = [(from[0] + to[0]) / 4, to[1] - SLOPE];
            singleLineData.points.push(checkPoint1);
            singleLineData.points.push(checkPoint2);
          } else {
            const checkPoint1 = [(from[0] + to[0]) / 2, from[1] + SLOPE / 2];
            const checkPoint2 = [(from[0] + to[0]) / 2, to[1] - SLOPE / 2];
            singleLineData.points.push(checkPoint1);
            singleLineData.points.push(checkPoint2);
          }
          singleLineData.color =
            node.position < parentNode.position ? node.color : parentNode.color;
        }
      }
      singleLineData.points.push(to);
      return singleLineData;
    });
    return rawLineData;
  });
  return lineData;
};

module.exports = lineDataGenerator;
