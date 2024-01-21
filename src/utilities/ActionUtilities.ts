export default class ActionUtilities {
  public static Repeat(action: ((data: void) => void), count: number): ((data: void) => void)[] {
    const result: ((data: void) => void)[] = [];
    for (let i = 0; i < count; i += 1) {
      result.push(action);
    }
    return result;
  }
}
