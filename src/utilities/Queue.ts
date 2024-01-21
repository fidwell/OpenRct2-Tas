// Courtesy of https://timmousk.com/blog/typescript-queue/
export class Queue<T> {
  public constructor(
    private elements: Record<number, T> = {},
    private head: number = 0,
    private tail: number = 0
  ) { }

  public enqueue(element: T) {
    this.elements[this.tail] = element;
    this.tail += 1;
  }

  public dequeue(): T {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head += 1;
    return item;
  }

  public peek(): T {
    return this.elements[this.head];
  }

  public get length(): number {
    return this.tail - this.head;
  }

  public get isEmpty(): boolean {
    return this.length === 0;
  }
}
