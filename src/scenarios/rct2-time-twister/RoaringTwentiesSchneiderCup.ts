import GameSetSpeed from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import AirPoweredVerticalCoaster from "../../rides/rollerCoasters/AirPoweredVerticalCoaster";
import LoopingRollerCoaster from "../../rides/rollerCoasters/LoopingRollerCoaster";
import ScenarioRunner from "../ScenarioRunner";

export default class RoaringTwentiesSchneiderCup extends ScenarioRunner {
  constructor(method: number) {
    let actions = method == 1
      ? [
        () => GameSetSpeed.Turbo(),
        () => ParkModify.SetLoan(50000),
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
