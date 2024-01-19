/*
Note: This speedrun technique no longer works.
The game recalculates park value before it checks
to see whether you've completed the objective.
*/

import ScenarioRunner from "../ScenarioRunner";
import GameSetSpeed from "../../actions/GameSetSpeed";
import RideModify from "../../actions/RideModify";

export default class SixFlagsMm extends ScenarioRunner {
  constructor() {
    super([
      // Sell Goliath
      () => RideModify.Demolish(2),
      // Sell Flashback
      () => RideModify.Demolish(26),
      // Pay off loan
      () => context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 0 }),
      // Go fast
      () => GameSetSpeed.Turbo()
    ]);
  }
}
