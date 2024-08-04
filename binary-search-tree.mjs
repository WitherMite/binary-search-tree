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
    // sort array
    // remove duplicate values
  }

  constructor(arr) {
    // const sortedArr = BinarySearchTree.#sanitizeArr(arr);
    this.root = BinarySearchTree.#build(arr);
  }
}
