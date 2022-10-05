import { PLAIN_DIRECTION } from '../constant';
import { rand } from '../util';

const isHeightLongThanWidth = (rowBegin, rowEnd, colBegin, colEnd) => {
  return rowEnd - (rowBegin + 2) > colEnd - colBegin;
};

export const recursiveDivisionWrapper = (widthCount, heightCount, nodes) => {
  const animatedMazeNodeIds = [];

  const skew = isHeightLongThanWidth(0, heightCount - 1, 0, widthCount - 1)
    ? PLAIN_DIRECTION.HORIZONTAL
    : PLAIN_DIRECTION.VERTICAL;

  recursiveDivision(
    skew,
    0,
    heightCount - 1,
    0,
    widthCount - 1,
    nodes,
    animatedMazeNodeIds,
  );
  return animatedMazeNodeIds;
};

export const recursiveDivision = (
  skew,
  rowBeginIndex,
  rowEndIndex,
  colBeginIndex,
  colEndIndex,
  nodes,
  animatedMazeNodeIds,
) => {
  if (rowEndIndex <= rowBeginIndex || colEndIndex <= colBeginIndex) {
    return;
  }

  const randomRowsBox = [];
  const randomColsBox = [];

  if (skew === PLAIN_DIRECTION.HORIZONTAL) {
    for (let row = rowBeginIndex + 2; row <= rowEndIndex - 2; row += 2) {
      randomRowsBox.push(row);
    }

    for (let col = colBeginIndex - 1; col <= colEndIndex - 1; col += 2) {
      randomColsBox.push(col);
    }
  } else if (skew === PLAIN_DIRECTION.VERTICAL) {
    for (let row = rowBeginIndex - 1; row <= rowEndIndex - 1; row += 2) {
      randomRowsBox.push(row);
    }

    for (let col = colBeginIndex + 2; col <= colEndIndex - 2; col += 2) {
      randomColsBox.push(col);
    }
  }

  if (!randomRowsBox.length || !randomColsBox.length) {
    return;
  }

  const rowIndex = rand(0, randomRowsBox.length);
  const row = randomRowsBox[rowIndex];

  const colIndex = rand(0, randomColsBox.length);
  const col = randomColsBox[colIndex];

  nodes.allIds.flat().forEach((nodeId) => {
    const [idRow, idCol] = nodeId.split('-').map(Number);

    if (skew === PLAIN_DIRECTION.HORIZONTAL) {
      if (colBeginIndex - 1 > idCol || colEndIndex + 1 < idCol) {
        return;
      }

      if (idRow === row && idCol !== col) {
        animatedMazeNodeIds.push(nodeId);
      }
    } else if (skew === PLAIN_DIRECTION.VERTICAL) {
      if (rowBeginIndex - 1 > idRow || rowEndIndex + 1 < idRow) {
        return;
      }

      if (idCol === col && idRow !== row) {
        animatedMazeNodeIds.push(nodeId);
      }
    }
  });

  if (skew === PLAIN_DIRECTION.HORIZONTAL) {
    const nextSkewA = isHeightLongThanWidth(
      rowBeginIndex,
      row,
      colBeginIndex,
      colEndIndex,
    )
      ? PLAIN_DIRECTION.HORIZONTAL
      : PLAIN_DIRECTION.VERTICAL;
    const nextSkewB = isHeightLongThanWidth(
      row,
      rowEndIndex,
      colBeginIndex,
      colEndIndex,
    )
      ? PLAIN_DIRECTION.HORIZONTAL
      : PLAIN_DIRECTION.VERTICAL;

    recursiveDivision(
      nextSkewA,
      rowBeginIndex,
      row - 2,
      colBeginIndex,
      colEndIndex,
      nodes,
      animatedMazeNodeIds,
    );
    recursiveDivision(
      nextSkewB,
      row + 2,
      rowEndIndex,
      colBeginIndex,
      colEndIndex,
      nodes,
      animatedMazeNodeIds,
    );
  } else if (skew === PLAIN_DIRECTION.VERTICAL) {
    const nextSkewA = isHeightLongThanWidth(
      rowBeginIndex,
      rowEndIndex,
      colBeginIndex,
      col,
    )
      ? PLAIN_DIRECTION.HORIZONTAL
      : PLAIN_DIRECTION.VERTICAL;
    const nextSkewB = isHeightLongThanWidth(
      rowBeginIndex,
      rowEndIndex,
      col,
      colEndIndex,
    )
      ? PLAIN_DIRECTION.HORIZONTAL
      : PLAIN_DIRECTION.VERTICAL;

    recursiveDivision(
      nextSkewA,
      rowBeginIndex,
      rowEndIndex,
      colBeginIndex,
      col - 2,
      nodes,
      animatedMazeNodeIds,
    );
    recursiveDivision(
      nextSkewB,
      rowBeginIndex,
      rowEndIndex,
      col + 2,
      colEndIndex,
      nodes,
      animatedMazeNodeIds,
    );
  }
};

export default recursiveDivision;
