import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import RideModify from "../../actions/RideModify";
import { GameSpeed } from "../../enums/GameSpeed";
import TileCoord from "../../map/TileCoord";
import CorkscrewRollerCoaster from "../../rides/rollerCoasters/CorkscrewRollerCoaster";
import ScenarioRunner from "../ScenarioRunner";

export default class AnimatronicFilmSet extends ScenarioRunner {
  constructor() {
    super(new TileCoord(74, 47), [
      () => GameModify.SetSpeed(GameSpeed.Hyper),
      () => RideModify.Demolish(11), // Crazy Cerberus
      () => ParkModify.SetLoan(100000),
      ...new CorkscrewRollerCoaster().BuildBoomerang(54, 58, 2, 83),
      ...new CorkscrewRollerCoaster().BuildBoomerang(58, 51, 2, 87),
      ...new CorkscrewRollerCoaster().BuildBoomerang(58, 46, 2, 93),
      ...new CorkscrewRollerCoaster().BuildBoomerang(70, 60, 2, 93),
      ...new CorkscrewRollerCoaster().BuildBoomerang(75, 54, 2, 93),
      ...new CorkscrewRollerCoaster().BuildBoomerang(71, 48, 2, 93),
      ...new CorkscrewRollerCoaster().BuildBoomerang(71, 43, 2, 93),
      ...new CorkscrewRollerCoaster().BuildBoomerang(69, 37, 2, 95),
      ...new CorkscrewRollerCoaster().BuildBoomerang(68, 32, 2, 95),
      ...new CorkscrewRollerCoaster().BuildBoomerang(89, 35, 1, 89),
    ]);
  }
}
