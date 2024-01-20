import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import { GameSpeed } from "../../enums/GameSpeed";
import TileCoord from "../../map/TileCoord";
import CorkscrewRollerCoaster from "../../rides/rollerCoasters/CorkscrewRollerCoaster";
import ScenarioRunner from "../ScenarioRunner";

export default class AfterTheAsteroid extends ScenarioRunner {
  constructor() {
    super(new TileCoord(57, 33), [
      () => GameModify.SetSpeed(GameSpeed.Hyper),
      () => ParkModify.SetLoan(140000),
      ...new CorkscrewRollerCoaster().BuildBoomerang(54, 33, 1, 57),
      ...new CorkscrewRollerCoaster().BuildBoomerang(59, 33, 1, 65),
      ...new CorkscrewRollerCoaster().BuildBoomerang(64, 33, 1, 73),
      ...new CorkscrewRollerCoaster().BuildBoomerang(69, 33, 1, 81)
    ]);
  }
}
