import ScenarioRunner from "../ScenarioRunner";
import GameSetSpeed from "../../actions/GameSetSpeed";
import AirPoweredVerticalCoaster from "../../rides/AirPoweredVerticalCoaster";
import LoopingRollerCoaster from "../../rides/LoopingRollerCoaster";

export default class RoaringTwentiesSchneiderCup extends ScenarioRunner {
  constructor(method: number) {
    let actions = method == 1
      ? [
        () => GameSetSpeed.Turbo(),
        // Take out $5,000 loan
        () => context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 50000 }),
        // Build and open some shuttle loops
        ...new LoopingRollerCoaster().BuildShuttleLoop(4, 88, 60, 2),
        ...new LoopingRollerCoaster().BuildShuttleLoop(6, 77, 60, 2),
        ...new LoopingRollerCoaster().BuildShuttleLoop(4, 73, 60, 2),
        ...new LoopingRollerCoaster().BuildShuttleLoop(7, 68, 60, 2),
        ...new LoopingRollerCoaster().BuildShuttleLoop(7, 64, 60, 2),
        ...new LoopingRollerCoaster().BuildShuttleLoop(8, 60, 60, 2),
        ...new LoopingRollerCoaster().BuildShuttleLoop(9, 56, 60, 2),
        ...new LoopingRollerCoaster().BuildShuttleLoop(12, 52, 60, 2)
      ]
      : [
        () => GameSetSpeed.Turbo(),
        // Build and open some APVs
        ...new AirPoweredVerticalCoaster().BuildTinyLoop(6, 88, 60, 3),
        ...new AirPoweredVerticalCoaster().BuildTinyLoop(9, 71, 60, 3),
        ...new AirPoweredVerticalCoaster().BuildTinyLoop(14, 82, 60, 3),
        ...new AirPoweredVerticalCoaster().BuildTinyLoop(17, 71, 60, 3)
      ];

    super(actions);
  }
}
