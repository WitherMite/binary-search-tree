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

const randomArr = Array.from({ length: 127 }, () =>
  Math.floor(Math.random() * 101)
);
const tree = new BinarySearchTree(randomArr);
prettyPrint(tree.root);
tree.insert(101);
tree.insert(50);
tree.insert(-1);
prettyPrint(tree.root);
