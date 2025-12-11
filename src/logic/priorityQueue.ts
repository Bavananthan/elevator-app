export default class PriorityQueue<T> {
  private data: T[] = [];
  private comparator: (a: T, b: T) => boolean;

  constructor(comparator: (a: T, b: T) => boolean) {
    this.comparator = comparator;
  }

  add(item: T) {
    if (!this.has(item)) {
      this.data.push(item);
      this.data.sort((a, b) => (this.comparator(a, b) ? -1 : 1));
    }
  }

  poll(): T | undefined {
    return this.data.shift();
  }

  peek(): T | undefined {
    return this.data[0];
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  has(item: T): boolean {
    return this.data.includes(item);
  }

  toArray(): T[] {
    return [...this.data];
  }
}
