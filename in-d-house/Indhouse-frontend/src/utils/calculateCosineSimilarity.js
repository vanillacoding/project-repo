const calculateCosineSimilarity = (genreOfCurrentUser, genreOfComparativeUser) => {
  const left = Math.sqrt(genreOfCurrentUser.size);
  const right = Math.sqrt(genreOfComparativeUser.length);
  const denominator = left * right;
  let molecule = 0;

  genreOfComparativeUser.forEach(genre => {
    if (genreOfCurrentUser.has(genre.genreId)) {
      molecule += 1;
    }
  });

  return molecule / denominator;
};

export default calculateCosineSimilarity;
