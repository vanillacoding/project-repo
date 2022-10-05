const ALGORITHM = require('../constant/algorithm');

function checkAlgorithm(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const hasAlgorithm = Object.values(ALGORITHM).some(
    (algorithm) => algorithm === str.toLowerCase(),
  );

  return hasAlgorithm;
}

function isValidAlgorithm(algorithms) {
  if (!Array.isArray(algorithms)) {
    return false;
  }

  const result = algorithms.some((algorithm) => !checkAlgorithm(algorithm));

  return !result;
}

function isValidBlock(block) {
  if (!Array.isArray(block)) {
    return false;
  }

  const isRowArray = !block.some((row) => !Array.isArray(row));

  if (!isRowArray) {
    return false;
  }

  let [startNodeCount, endNodeCount, stopoverNodeCount] = [0, 0, 0];

  const result = !block.some((row) =>
    row.some((node) => {
      switch (node) {
        case 0:
        case 1:
        case 2: {
          return false;
        }

        case 3: {
          startNodeCount += 1;
          return startNodeCount >= 2;
        }

        case 4: {
          endNodeCount += 1;
          return endNodeCount >= 2;
        }

        case 5: {
          stopoverNodeCount += 1;
          return stopoverNodeCount >= 2;
        }

        default: {
          return true;
        }
      }
    }),
  );

  return startNodeCount === 1 && endNodeCount === 1 && result;
}

module.exports = { isValidAlgorithm, isValidBlock };
