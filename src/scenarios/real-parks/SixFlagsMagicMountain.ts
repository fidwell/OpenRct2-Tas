/*
Note: This speedrun technique no longer works.
The game recalculates park value before it checks
to see whether you've completed the objective.
*/

import ScenarioRunner from "../ScenarioRunner";
import GameSetSpeed from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import RideModify from "../../actions/RideModify";

export default class SixFlagsMm extends ScenarioRunner {
  constructor() {
    super([
      // Sell Goliath
      () => RideModify.Demolish(2),
      // Sell Flashback
      () => RideModify.Demolish(26),
      () => ParkModify.SetLoan(0),
      () => GameSetSpeed.Turbo()
    ]);
  }
}
