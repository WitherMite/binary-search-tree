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
tree.insert(101);
tree.insert(50);
prettyPrint(tree.root);
// tree.insert(-1);
// prettyPrint(tree.root);
// tree.remove(101);
// tree.remove(50);
// tree.remove(75);
// tree.remove(25);
// tree.remove(-1);
// prettyPrint(tree.root);
// console.log("preorder:");
// tree.preOrder((node) => console.log(node.value));
// console.log("inorder:");
// tree.inOrder((node) => console.log(node.value));
// console.log("postorder:");
// tree.postOrder((node) => console.log(node.value));
console.log(tree.find(50).height());
console.log(tree.depth(tree.find(101)));
