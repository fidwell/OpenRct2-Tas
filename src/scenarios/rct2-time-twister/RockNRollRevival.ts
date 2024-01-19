import ScenarioRunner from "../ScenarioRunner";
import GameSetSpeed from "../../actions/GameSetSpeed";
import TileCoord from "../../map/TileCoord";
import RotoDrop from "../../rides/Rotodrop";
import ArrayUtilities from "../../utilities/ArrayUtilities";

export default class RockNRollRevival extends ScenarioRunner {
  constructor() {
    const rotoDropHeight: number = 35;
    super([
      // Go fast
      () => GameSetSpeed.Turbo(),
      // Delete all rides
      ...ArrayUtilities.range(0, 14).map(i => () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: i, modifyType: 0 })),
      // Pay off loan
      () => context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 0 }),
      // Build 9 really tall roto-drops in test mode
      ...new RotoDrop().Build(new TileCoord(61, 41), rotoDropHeight),
      ...new RotoDrop().Build(new TileCoord(64, 37), rotoDropHeight),
      ...new RotoDrop().Build(new TileCoord(69, 38), rotoDropHeight),
      ...new RotoDrop().Build(new TileCoord(78, 44), rotoDropHeight),
      ...new RotoDrop().Build(new TileCoord(74, 46), rotoDropHeight),
      ...new RotoDrop().Build(new TileCoord(70, 48), rotoDropHeight),
      ...new RotoDrop().Build(new TileCoord(82, 49), rotoDropHeight),
      ...new RotoDrop().Build(new TileCoord(76, 52), rotoDropHeight),
      ...new RotoDrop().Build(new TileCoord(72, 54), rotoDropHeight)
    ]);
  }
}
