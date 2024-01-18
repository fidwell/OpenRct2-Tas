export default class ScenarioRunner {
  constructor(public Actions: ((data: void) => void)[]) { }
  IsWaiting: boolean = false;
}
