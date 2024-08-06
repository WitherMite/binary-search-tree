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

const logInEveryOrder = (tree) => {
  const arr = [];
  tree.levelOrder((node) => arr.push(node.value));
  console.log("Level order:");
  console.log(arr);

  arr.splice(0, arr.length);
  tree.preOrder((node) => arr.push(node.value));
  console.log("Pre order:");
  console.log(arr);

  arr.splice(0, arr.length);
  tree.inOrder((node) => arr.push(node.value));
  console.log("In order:");
  console.log(arr);

  arr.splice(0, arr.length);
  tree.postOrder((node) => arr.push(node.value));
  console.log("Post order:");
  console.log(arr);
};

const randomArr = Array.from({ length: 63 }, () =>
  Math.floor(Math.random() * 100)
);
const tree = new BinarySearchTree(randomArr);

prettyPrint(tree.root);
console.log(`Balanced: ${BinarySearchTree.isBalanced(tree)}`);
logInEveryOrder(tree);

console.log("Unbalancing tree...");
[101, 104, 120, 500, 260].forEach((val) => {
  console.log(`Adding ${val}`);
  tree.insert(val);
});
prettyPrint(tree.root);
console.log(`Balanced: ${BinarySearchTree.isBalanced(tree)}`);

console.log("Rebalancing tree...");
BinarySearchTree.rebalance(tree);
console.log(`Balanced: ${BinarySearchTree.isBalanced(tree)}`);
logInEveryOrder(tree);
prettyPrint(tree.root);
