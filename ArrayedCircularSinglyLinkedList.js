class ArrayedCircularSinglyLinkedList {
  constructor() {
    this.characters = [];
  }

  length() {
    return this.characters.length;
  }

  append(value) {
    this.characters.push(value);
  }

  insert(value, index) {
    if (index < 0 || index > this.characters.length)
      return `Error: invalid index, provide an integer from 0 to ${this.characters.length}`;
    this.characters.splice(index, 0, value);
  }

  delete(index) {
    if (this.characters.length === 0) return "No elements were found";
    if (index < 0 || index >= this.characters.length)
      return `Error: invalid index, provide an integer from 0 to ${
        this.characters.length - 1
      }`;
    return this.characters.splice(index, 1)[0];
  }

  deleteAll(value) {
    this.characters = this.characters.filter((char) => char !== value);
  }

  get(index) {
    if (this.characters.length === 0) return "No elements were found";
    if (index < 0 || index >= this.characters.length)
      return `Error: invalid index, provide an integer from 0 to ${
        this.characters.length - 1
      }`;
    return this.characters[index];
  }

  clone() {
    const newList = new ArrayedCircularSinglyLinkedList();
    newList.characters = [...this.characters];
    return newList;
  }

  reverse() {
    if (this.characters.length <= 1) return "Nothing to reverse";
    this.characters.reverse();
  }

  findFirst(value) {
    return this.characters.indexOf(value);
  }

  findLast(value) {
    return this.characters.lastIndexOf(value);
  }

  clear() {
    this.characters = [];
  }

  extend(otherList) {
    this.characters.push(...otherList.characters);
  }
}

module.exports = ArrayedCircularSinglyLinkedList;
