export const getRandomIndexes = (length, minNumber) => {
  const set = new Set();

  while (set.size < minNumber) {
    const random = Math.floor(Math.random() * length);

    if (!set.has(random)) {
      set.add(random);
    }
  }

  return set;
};
