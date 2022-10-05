export default function shuffleArray<T extends number[]>(
  array: T,
  columns: number,
): T {
  const targetArrayLength = array.length / columns;

  for (let i = 0; i < array.length; i++) {
    const targetIndex =
      Math.floor(Math.random() * targetArrayLength) +
      Math.floor(i / targetArrayLength) * targetArrayLength;

    [array[i], array[targetIndex]] = [array[targetIndex], array[i]];
  }

  return array;
}
