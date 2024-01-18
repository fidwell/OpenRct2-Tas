/*
Note: This speedrun technique no longer works.
The game recalculates park value before it checks
to see whether you've completed the objective.
*/

import ScenarioRunner from "../ScenarioRunner";

export default class SixFlagsMm extends ScenarioRunner {
  constructor() {
    super([
      // Sell Goliath
      () => { context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 2, modifyType: 0 }); },
      // Sell Flashback
      () => { context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 26, modifyType: 0 }); },
      // Pay off loan
      () => { context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 0 }); },
      // Go fast
      () => { context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 }); }
    ]);
  }
}
