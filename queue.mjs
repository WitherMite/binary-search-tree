//  course suggests an array, but couldnt find a way to use it as a queue that wasnt O(n) from adjusting indexes, while this is constant, just has to push to back or pop off front

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

export default class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  enqueue(item) {
    if (!item) return;
    const node = new Node(item);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }
  dequeue() {
    const item = this.head?.item;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head?.next;
    }
    return item;
  }
}
