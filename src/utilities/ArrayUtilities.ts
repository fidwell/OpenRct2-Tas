export default class ArrayUtilities {
  static range(from: number, to: number): number[] {
    const result: number[] = [];
    for (let x = from; x <= to; x += 1) {
      result.push(x);
    }
    return result;
  }
}
