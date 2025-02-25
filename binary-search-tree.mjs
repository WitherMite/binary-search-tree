import mergeSort from "./merge-sort.mjs";
import Queue from "./queue.mjs";

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
  static #getSuccessor(node) {
    let nextNode = node.rightTree;
    while (nextNode.leftTree !== null) {
      nextNode = nextNode.leftTree;
    }
    return nextNode;
  }

  static isBalanced(tree) {
    // I believe using level order will find some unbalanced branch the fastest, as it wont explore an entire balanced subtree
    const queue = new Queue();
    queue.enqueue(tree.root);
    while (queue.tail) {
      const node = queue.dequeue();
      if (node) {
        const leftHeight = tree.height(node.leftTree);
        const rightHeight = tree.height(node.rightTree);
        if (Math.abs(leftHeight - rightHeight) > 1) return false;
        queue.enqueue(node.leftTree);
        queue.enqueue(node.rightTree);
      }
    }
    // would've reused levelOrder method, but would need to rewrite it to be able to stop early from inside the callback fn
    return true;
  }
  static rebalance(tree) {
    if (BinarySearchTree.isBalanced(tree)) return tree;
    const arr = [];
    tree.inOrder((node) => arr.push(node.value));
    tree.root = BinarySearchTree.#build(arr);
    return tree;
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
  remove(value) {
    const delNode = (val, node = this.root) => {
      if (node === null) return node;
      // recursively change the tree's edges in search for val
      if (val < node.value) node.leftTree = delNode(val, node.leftTree);
      if (val > node.value) node.rightTree = delNode(val, node.rightTree);
      // send up the new node for each level of tree
      if (val !== node.value) return node;
      if (node.leftTree && node.rightTree) {
        const successor = BinarySearchTree.#getSuccessor(node);
        node.value = successor.value;
        node.rightTree = delNode(successor.value, node.rightTree);
        return node;
      } else {
        return node.rightTree ? node.rightTree : node.leftTree;
      }
    };
    this.root = delNode(value);
  }
  find(value) {
    let node = this.root;
    while (node?.value !== value && node !== null) {
      if (node?.value < value) node = node.rightTree;
      if (node?.value > value) node = node.leftTree;
    }
    return node;
  }
  depth(node) {
    if (!(node instanceof Node)) return;
    let parent = this.root;
    let count = 0;
    while (parent !== null) {
      if (node.value === parent.value) return count;
      if (node.value < parent.value) {
        parent = parent.leftTree;
      } else {
        parent = parent.rightTree;
      }
      count++;
    }
    return null;
  }
  height(node) {
    if (!(node instanceof Node)) return;
    const leftHeight = node.leftTree ? 1 + this.height(node.leftTree) : 0;
    const rightHeight = node.rightTree ? 1 + this.height(node.rightTree) : 0;
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  levelOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("Invalid callback provided", { cause: callback });

    const queue = new Queue();
    queue.enqueue(this.root);
    while (queue.tail) {
      const node = queue.dequeue();
      if (node) {
        callback(node);
        queue.enqueue(node.leftTree);
        queue.enqueue(node.rightTree);
      }
    }
  }
  inOrder(callback, node = this.root) {
    if (!(node instanceof Node)) return;
    if (typeof callback !== "function")
      throw new Error("Invalid callback provided", { cause: callback });
    this.inOrder(callback, node.leftTree);
    callback(node);
    this.inOrder(callback, node.rightTree);
  }
  preOrder(callback, node = this.root) {
    if (!(node instanceof Node)) return;
    if (typeof callback !== "function")
      throw new Error("Invalid callback provided", { cause: callback });
    callback(node);
    this.preOrder(callback, node.leftTree);
    this.preOrder(callback, node.rightTree);
  }
  postOrder(callback, node = this.root) {
    if (!(node instanceof Node)) return;
    if (typeof callback !== "function")
      throw new Error("Invalid callback provided", { cause: callback });
    this.postOrder(callback, node.leftTree);
    this.postOrder(callback, node.rightTree);
    callback(node);
  }
}
