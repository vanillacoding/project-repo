import calculateCosineSimilarity from "./calculateCosineSimilarity";

const filterSimilarUsers = (genreOfCurrentUser, genreOfComparativeGroup) => {
  const userGenre = new Map();
  const resultOfCalculate = [];

  genreOfCurrentUser.forEach(genre => {
    userGenre.set(genre.genreId);
  });

  genreOfComparativeGroup.forEach(target => {
    const score = calculateCosineSimilarity(userGenre, target.likeGenre);

    resultOfCalculate.push([target, score]);
  });

  resultOfCalculate.sort((a, b) => b[1] - a[1]);

  return resultOfCalculate.slice(0, 3);
};

export default filterSimilarUsers;
