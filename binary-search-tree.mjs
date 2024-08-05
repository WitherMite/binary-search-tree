import mergeSort from "./merge-sort.mjs";

class Node {
  constructor(value) {
    this.value = value;
    this.leftTree = null;
    this.rightTree = null;
  }
}

export default class BinarySearchTree {
  static #build(sortedArr) {
    if (sortedArr.length === 0) return null;
    const middle = Math.floor((sortedArr.length - 1) / 2);
    const leftArr = sortedArr.slice(0, middle);
    const rightArr = sortedArr.slice(middle + 1);

    const root = new Node(sortedArr[middle]);
    root.leftTree = BinarySearchTree.#build(leftArr);
    root.rightTree = BinarySearchTree.#build(rightArr);
    return root;
  }
  static #sanitizeArr(arr) {
    const sortedArr = mergeSort(arr);

    // remove duplicate values
    for (let i = 1; i < sortedArr.length; i++) {
      if (sortedArr[i] !== sortedArr[i - 1]) continue;

      // decrement i to account for shifting indexes
      sortedArr.splice(i--, 1);
    }
    return sortedArr;
  }

  constructor(arr, isSorted = false) {
    const sortedArr = isSorted ? arr : BinarySearchTree.#sanitizeArr(arr);
    this.root = BinarySearchTree.#build(sortedArr);
  }

  insert(value, node = this.root) {
    if (value === node.value) return;
    if (value < node.value) {
      if (node.leftTree === null) return (node.leftTree = new Node(value));
      this.insert(value, node.leftTree);
    }
    if (value > node.value) {
      if (node.rightTree === null) return (node.rightTree = new Node(value));
      this.insert(value, node.rightTree);
    }
  }
}
