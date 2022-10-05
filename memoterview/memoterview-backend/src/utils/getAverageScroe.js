function getAverageScore(scores) {
  return scores && scores.length > 0
    ? scores.reduce(
      (acc, scoreItem) =>
        typeof scoreItem === "object" ? acc + Number(scoreItem.score) : acc + Number(scoreItem),
      0
    ) / scores.length
    : 0;
}

exports.getAverageScore = getAverageScore;

exports.getFilterAvgScors = function getFilterAvgScors(filterScores) {
  const filterAvgScores = {};

  if (!filterScores) {
    return {};
  }

  for (const filter of Object.keys(filterScores)) {
    filterAvgScores[filter] = getAverageScore(filterScores[filter]);
  }

  return filterAvgScores;
};
