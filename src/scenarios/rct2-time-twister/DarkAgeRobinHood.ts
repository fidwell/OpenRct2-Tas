import GameModify from "../../actions/GameSetSpeed";
import RideModify from "../../actions/RideModify";
import { GameSpeed } from "../../enums/GameSpeed";
import ScenarioRunner from "../ScenarioRunner";

export default class DarkAgeRobinHood extends ScenarioRunner {
  constructor() {
    super([
      () => RideModify.Price(3, 100),
      () => GameModify.SetSpeed(GameSpeed.Hyper),
    ]);
  }
}
