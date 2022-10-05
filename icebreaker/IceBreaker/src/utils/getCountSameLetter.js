const countEachLetter = (string) => {
  const hash = {};

  for (const str of [...string]) {
    if (hash[str]) {
      hash[str] = +1;
      continue;
    }

    hash[str] = 1;
  }

  return hash;
};

export const getCountSameLetter = (answer, input) => {
  const numberOfLetter = countEachLetter(answer);
  let count = 0;

  for (let i = 0; i < answer.length; i++) {
    const str = input[i];

    if (str === answer[i]) {
      count++;
      numberOfLetter[str] -= 1;
      continue;
    }

    if (numberOfLetter[str] > 0) {
      count++;
      numberOfLetter[str] -= 1;
    }
  }

  return count;
};
