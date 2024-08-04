import BinarySearchTree from "./binary-search-tree.mjs";

// print function provided by odin project
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightTree !== null) {
    prettyPrint(node.rightTree, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftTree !== null) {
    prettyPrint(node.leftTree, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const sortedArr = [1, 3, 5, 12, 15, 17, 19, 20, 21, 25];
const tree = new BinarySearchTree(sortedArr);
prettyPrint(tree.root);
