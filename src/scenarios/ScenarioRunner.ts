import TileCoord from "../map/TileCoord";
import { ActionQueue } from "../utilities/ActionQueue";
import IScenarioRunner from "./IScenarioRunner";

export default class ScenarioRunner implements IScenarioRunner {
  public Actions: ActionQueue;
  
  constructor(
    public CameraLocation: TileCoord,
    actions: ((data: void) => void)[]
  ) {
    this.Actions = new ActionQueue(actions);
   }

  public OnTick(): void {
    if (!this.Actions.isEmpty) {
      this.Actions.dequeue()();
    }
  }
}
