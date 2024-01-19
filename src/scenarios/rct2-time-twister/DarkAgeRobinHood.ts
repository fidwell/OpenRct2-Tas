import ScenarioRunner from "../ScenarioRunner";
import GameSetSpeed from "../../actions/GameSetSpeed";

export default class DarkAgeRobinHood extends ScenarioRunner {
  constructor() {
    super([
      () => context.executeAction("ridesetprice", <RideSetPriceArgs>{
        ride: 3,
        price: 100,
        isPrimaryPrice: true
      }),
      () => GameSetSpeed.Turbo()
    ]);
  }
}
