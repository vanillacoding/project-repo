export const calcHalf = (number) => {
  if (typeof number !== 'number') {
    return 0;
  }

  const result = number / 2;

  if (Number.isNaN(result)) {
    return 0;
  }

  if (!Number.isFinite(result)) {
    return 0;
  }

  return result;
};

export const calcRectInfos = (index, nodeSpace, nodeRadius) => {
  const x = 0;
  const y = index * nodeSpace + (calcHalf(nodeSpace) - nodeRadius);
  const width = 1000;
  const height = nodeRadius * 2;

  return [x, y, width, height];
};

export default {
  calcHalf,
  calcRectInfos,
};
