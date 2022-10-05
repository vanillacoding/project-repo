export default function mergeSort(blocks1, blocks2) {
  const result = [];
  let left = 0;
  let right = 0;

  while (
    left < blocks1.length
    && right < blocks2.length
  ) {
    if (blocks1[left].index <= blocks2[right].index) {
      result.push(blocks1[left]);
      left++;
    } else {
      result.push(blocks2[right]);
      right++;
    }
  }

  return result
    .concat(blocks1.slice(left))
    .concat(blocks2.slice(right));
}
