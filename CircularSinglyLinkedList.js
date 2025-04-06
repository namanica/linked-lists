class Character {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class CircularSinglyLinkedList {
  constructor() {
    this.tail = null;
    this.size = 0;
  }

  length() {
    return this.size;
  }

  append(value) {
    const node = new Character(value);

    if (!this.tail) {
      node.next = node;
      this.tail = node;
    } else {
      node.next = this.tail.next;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  insert(value, index) {
    if (index < 0 || index > this.size)
      return `Error: invalid index, provide an integer from 0 to ${this.size}`;

    const node = new Character(value);

    if (!this.tail) {
      node.next = node;
      this.tail = node;
    } else if (index === 0) {
      node.next = this.tail.next;
      this.tail.next = node;
    } else {
      let current = this.tail.next;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      node.next = current.next;
      current.next = node;
      if (index === this.size) this.tail = node;
    }

    this.size++;
  }

  delete(index) {
    if (this.size === 0) return "No elements were found";
    if (index < 0 || index >= this.size)
      return `Error: invalid index, provide an integer from 0 to ${
        this.size - 1
      }`;

    let removed;

    if (this.size === 1) {
      removed = this.tail;
      this.tail = null;
    } else if (index === 0) {
      removed = this.tail.next;
      this.tail.next = removed.next;
    } else {
      let current = this.tail.next;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      removed = current.next;
      current.next = removed.next;
      if (removed === this.tail) this.tail = current;
    }

    this.size--;
    return removed.value;
  }

  deleteAll(value) {
    if (!this.tail) return;

    let current = this.tail.next;
    let prev = this.tail;
    let count = this.size;

    while (count--) {
      if (current.value === value) {
        if (current === this.tail) this.tail = prev;
        if (this.size === 1) {
          this.tail = null;
        } else {
          prev.next = current.next;
        }
        current = current.next;
        this.size--;
      } else {
        prev = current;
        current = current.next;
      }
    }
  }

  get(index) {
    if (this.size === 0) return "No elements were found";
    if (index < 0 || index >= this.size)
      return `Error: invalid index, provide an integer from 0 to ${
        this.size - 1
      }`;

    let current = this.tail.next;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.value;
  }

  clone() {
    const newList = new CircularSinglyLinkedList();
    if (!this.tail) return newList;

    let current = this.tail.next;
    for (let i = 0; i < this.size; i++) {
      newList.append(current.value);
      current = current.next;
    }
    return newList;
  }

  reverse() {
    if (!this.tail || this.size === 1) return "Nothing to reverse";

    let prev = this.tail;
    let current = this.tail.next;
    let next;

    for (let i = 0; i < this.size; i++) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.tail = this.tail.next;
  }

  findFirst(value) {
    if (!this.tail) return -1;

    let current = this.tail.next;
    for (let i = 0; i < this.size; i++) {
      if (current.value === value) return i;
      current = current.next;
    }
    return -1;
  }

  findLast(value) {
    if (!this.tail) return -1;

    let current = this.tail;
    for (let i = this.size - 1; i >= 0; i--) {
      if (current.value === value) return i;
      current = this.getPrevious(current);
    }
    return -1;
  }

  getPrevious(node) {
    let current = this.tail;
    while (current.next !== node) {
      current = current.next;
    }
    return current;
  }

  clear() {
    this.tail = null;
    this.size = 0;
  }

  extend(list) {
    const copy = list.clone();
    if (!copy.tail) return;

    let current = copy.tail.next;
    for (let i = 0; i < copy.size; i++) {
      this.append(current.value);
      current = current.next;
    }
  }
}

module.exports = CircularSinglyLinkedList;
