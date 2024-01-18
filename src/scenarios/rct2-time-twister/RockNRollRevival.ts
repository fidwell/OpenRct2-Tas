import ScenarioRunner from "../ScenarioRunner";
import RotoDrop from "../../rides/Rotodrop";
import ArrayUtilities from "../../utilities/ArrayUtilities";

export default class RockNRollRevival extends ScenarioRunner {
  constructor() {
    const rotoDropHeight: number = 35;
    super([
      // Go fast
      () => context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 }),
      // Delete all rides
      ...ArrayUtilities.range(0, 14).map(i => () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: i, modifyType: 0 })),
      // Pay off loan
      () => context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 0 }),
      // Build 9 really tall roto-drops in test mode
      ...new RotoDrop().Build(61, 41, 28, rotoDropHeight),
      ...new RotoDrop().Build(64, 37, 28, rotoDropHeight),
      ...new RotoDrop().Build(69, 38, 28, rotoDropHeight),
      ...new RotoDrop().Build(78, 44, 32, rotoDropHeight),
      ...new RotoDrop().Build(74, 46, 32, rotoDropHeight),
      ...new RotoDrop().Build(70, 48, 32, rotoDropHeight),
      ...new RotoDrop().Build(82, 49, 32, rotoDropHeight),
      ...new RotoDrop().Build(76, 52, 32, rotoDropHeight),
      ...new RotoDrop().Build(72, 54, 32, rotoDropHeight)
    ]);
  }
}
