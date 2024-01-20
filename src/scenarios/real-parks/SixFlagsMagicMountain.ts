/*
Note: This speedrun technique no longer works.
The game recalculates park value before it checks
to see whether you've completed the objective.
*/

import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import RideModify from "../../actions/RideModify";
import { GameSpeed } from "../../enums/GameSpeed";
import TileCoord from "../../map/TileCoord";
import ScenarioRunner from "../ScenarioRunner";

export default class SixFlagsMm extends ScenarioRunner {
  constructor() {
    super(new TileCoord(162, 109), [
      // Sell Goliath
      () => RideModify.Demolish(2),
      // Sell Flashback
      () => RideModify.Demolish(26),
      () => ParkModify.SetLoan(0),
      () => GameModify.SetSpeed(GameSpeed.Hyper),
    ]);
  }
}
