export const createPrimeCommandList = (wholeCommandStats) => {
  const wholeCommandStatsEntires = Object.entries(wholeCommandStats);
  const primeCommandList = wholeCommandStatsEntires.reduce(
    (acc, cur) => {
      const First = [...acc[0]];
      const Second = [...acc[1]];
      const Third = [...acc[2]];

      if (cur[1] >= First[1]) {
        acc[1] = First;
        acc[2] = Second;
        acc[3][1] += Third[1];
        acc[0] = cur;
        return acc;
      }

      if (cur[1] >= Second[1]) {
        acc[2] = Second;
        acc[3][1] += Third[1];
        acc[1] = cur;
        return acc;
      }

      if (cur[1] >= Third[1]) {
        acc[3][1] += Third[1];
        acc[2] = cur;
        return acc;
      }

      acc[3][1] += cur[1];
      return acc;
    },
    [
      [null, 0],
      [null, 0],
      [null, 0],
      ['ETC', 0],
    ],
  );

  return primeCommandList;
};

export const getHighestCount = (primeCommandList) => {
  const highestCount = Math.max(primeCommandList[0][1], primeCommandList[3][1]);
  return highestCount;
};
