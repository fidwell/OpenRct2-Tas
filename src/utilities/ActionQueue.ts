import { Queue } from "./Queue";

export class ActionQueue extends Queue<(data: void) => void> {
  constructor(elements: ((data: void) => void)[] = []) {
    super();
    this.enqueueMany(elements);
  }

  public enqueueMany(elements: ((data: void) => void)[]) {
    for (let i = 0; i < elements.length; i++) {
      this.enqueue(elements[i]);
    }
  }
}
