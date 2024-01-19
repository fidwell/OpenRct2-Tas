import ScenarioRunner from "../ScenarioRunner";
import GameSetSpeed from "../../actions/GameSetSpeed";
import RideModify from "../../actions/RideModify";

export default class DarkAgeRobinHood extends ScenarioRunner {
  constructor() {
    super([
      () => RideModify.Price(3, 100),
      () => GameSetSpeed.Turbo()
    ]);
  }
}
