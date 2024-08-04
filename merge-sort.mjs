export default function mergeSort(arr) {
  if (arr.length === 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const unsortedLeft = arr.slice(0, middle);
  const unsortedRight = arr.slice(middle);

  const left = mergeSort(unsortedLeft);
  const right = mergeSort(unsortedRight);

  const sorted = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sorted.push(left[i++]);
    } else sorted.push(right[j++]);
  }
  if (i < left.length) sorted.push(...left.slice(i));
  if (j < right.length) sorted.push(...right.slice(j));

  return sorted;
}
