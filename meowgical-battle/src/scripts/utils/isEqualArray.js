const isEqualArray = (arrayA, arrayB) => {
  if (!Array.isArray(arrayA) || !Array.isArray(arrayB)) {
    throw new Error("arrayA or arrayB is not array");
  }

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let i = 0; i < arrayA.length; i += 1) {
    const itemA = arrayA[i];
    const itemB = arrayB[i];

    if (itemA !== itemB) {
      return false;
    }
  }

  return true;
};

export default isEqualArray;
