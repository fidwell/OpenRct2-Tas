import TileCoord from "../map/TileCoord";

export default class ScenarioRunner {
  constructor(
    public CameraLocation: TileCoord,
    public Actions: ((data: void) => void)[]) { }
  IsWaiting: boolean = false;
  CurrentAction: number = 0;

  public OnTick(): void {
    if (this.CurrentAction >= this.Actions.length)
      return;

    this.Actions[this.CurrentAction]();
    
    if (!this.IsWaiting) {
      this.CurrentAction += 1;
    }
  }
}
