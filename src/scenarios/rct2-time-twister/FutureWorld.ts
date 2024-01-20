import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import { GameSpeed } from "../../enums/GameSpeed";
import TileCoord from "../../map/TileCoord";
import AirPoweredVerticalCoaster from "../../rides/rollerCoasters/AirPoweredVerticalCoaster";
import ScenarioRunner from "../ScenarioRunner";

export default class FutureWorld extends ScenarioRunner {
  constructor() {
    super(new TileCoord(116, 45), [
      () => GameModify.SetSpeed(GameSpeed.Hyper),
      () => ParkModify.SetLoan(50000),
      ...new AirPoweredVerticalCoaster().BuildTinyLoop(126, 40, 14, 1),
      ...new AirPoweredVerticalCoaster().BuildTinyLoop(126, 48, 14, 1),
      ...new AirPoweredVerticalCoaster().BuildTinyLoop(126, 56, 14, 1),
      ...new AirPoweredVerticalCoaster().BuildTinyLoop(119, 40, 14, 1),
      ...new AirPoweredVerticalCoaster().BuildTinyLoop(119, 48, 14, 1),
      ...new AirPoweredVerticalCoaster().BuildTinyLoop(119, 56, 14, 1),
      ...new AirPoweredVerticalCoaster().BuildTinyLoop(112, 40, 14, 1)
    ]);
  }
}
