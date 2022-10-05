const getAverage = (a, b) => {
  if (b === 0) {
    return b;
  }

  return a / b;
};

module.exports = getAverage;
