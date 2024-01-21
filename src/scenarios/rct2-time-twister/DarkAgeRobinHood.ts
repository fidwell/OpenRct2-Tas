import GameModify from "../../actions/GameSetSpeed";
import RideModify from "../../actions/RideModify";
import { GameSpeed } from "../../enums/GameSpeed";
import TileCoord from "../../map/TileCoord";
import ScenarioRunner from "../ScenarioRunner";

export default class DarkAgeRobinHood extends ScenarioRunner {
  constructor() {
    super(new TileCoord(109, 90), [
      () => RideModify.Price(3, 100),
      () => GameModify.SetSpeed(GameSpeed.Hyper)
    ]);
  }
}
