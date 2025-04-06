const CircularSinglyLinkedList = require("./CircularSinglyLinkedList");

describe("CircularSinglyLinkedList", () => {
  let list;

  beforeEach(() => {
    list = new CircularSinglyLinkedList();
  });

  test("append method adds element to the end of the list", () => {
    list.append("a");
    list.append("b");
    expect(list.length()).toBe(2);
    expect(list.get(0)).toBe("a");
    expect(list.get(1)).toBe("b");
  });

  test("insert method adds element at the start of the list", () => {
    list.append("b");
    list.insert("a", 0);
    expect(list.get(0)).toBe("a");
    expect(list.get(1)).toBe("b");
  });

  test("insert method adds element in the middle of the list", () => {
    list.append("b");
    list.append("c");
    list.append("d");
    list.append("e");
    list.insert("a", 2);
    expect(list.get(1)).toBe("c");
    expect(list.get(2)).toBe("a");
  });

  test("insert method adds element at the end of the list", () => {
    list.append("b");
    list.append("c");
    list.append("d");
    list.append("e");
    list.insert("a", 4);
    expect(list.get(4)).toBe("a");
    expect(list.length()).toBe(5);
  });

  test("insert method throws an error on invalid position provided", () => {
    const result = list.insert("a", -1);
    expect(result).toContain("Error:");
  });

  test("delete method throws a message on empty list as there is nothing to delete", () => {
    const result = list.delete(0);
    expect(result).toBe("No elements were found");
  });

  test("delete method throws an error on invalid position provided", () => {
    list.append("d");
    const result = list.delete(-1);
    expect(result).toContain("Error:");
  });

  test("delete method deletes element on the provided position", () => {
    list.append("b");
    list.append("c");
    list.insert("a", 2);
    list.delete(0);
    expect(list.get(0)).toBe("c");
  });

  test("delete method deletes the only one element in the list", () => {
    list.append("b");
    list.delete(0);
    expect(list.length()).toBe(0);
  });

  test("deleteAll method removes all matching values in the list", () => {
    list.append("a");
    list.append("b");
    list.append("a");
    list.append("c");
    list.deleteAll("a");
    expect(list.length()).toBe(2);
    expect(list.get(0)).toBe("b");
    expect(list.get(1)).toBe("c");
  });

  test("get method returns the value of provided position in the list", () => {
    list.append("a");
    list.append("b");
    expect(list.get(1)).toBe("b");
  });

  test("get method returns an error on invalid index provided", () => {
    list.append("a");
    expect(list.get(2)).toContain("Error:");
  });

  test("get method returns a message on empty list", () => {
    expect(list.get(2)).toBe("No elements were found");
  });

  test("clone method creates a deep copy", () => {
    list.append("a");
    list.append("b");
    const clone = list.clone();
    expect(clone.get(0)).toBe("a");
    expect(clone.get(1)).toBe("b");
  });

  test("clone method doesn't influence the original list when changes to the clone were provided", () => {
    list.append("a");
    list.append("b");
    const clone = list.clone();
    expect(clone.get(0)).toBe("a");
    expect(clone.get(1)).toBe("b");
    clone.append("c");
    expect(list.length()).toBe(2);
  });

  test("reverse method works correctly", () => {
    list.append("a");
    list.append("b");
    list.append("c");
    list.reverse();
    expect(list.get(0)).toBe("c");
    expect(list.get(1)).toBe("b");
    expect(list.get(2)).toBe("a");
  });

  test("reverse method returns a message when there is nothing to reverse in the list", () => {
    let result = list.reverse();
    expect(result).toBe("Nothing to reverse");
    list.append("a");
    result = list.reverse();
    expect(result).toBe("Nothing to reverse");
  });

  test("findFirst and findLast methods return correct indices on provided values", () => {
    list.append("a");
    list.append("b");
    list.append("a");
    expect(list.findFirst("a")).toBe(0);
    expect(list.findLast("a")).toBe(2);
    expect(list.findFirst("z")).toBe(-1);
  });

  test("clear method empties the list", () => {
    list.append("x");
    list.append("y");
    list.clear();
    expect(list.length()).toBe(0);
    expect(list.get(0)).toBe("No elements were found");
  });

  test("extend method inserts another provided list into the original one", () => {
    const other = new CircularSinglyLinkedList();
    other.append("1");
    other.append("2");

    list.append("a");
    list.extend(other);
    expect(list.length()).toBe(3);
    expect(list.get(1)).toBe("1");
    expect(list.get(2)).toBe("2");
  });
});
