import Footpath from "../../actions/Footpath";
import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import { GameSpeed } from "../../enums/GameSpeed";
import TileCoord from "../../map/TileCoord";
import Hypercoaster from "../../rides/rollerCoasters/Hypercoaster";
import ScenarioRunner from "../ScenarioRunner";

export default class RioCarnival extends ScenarioRunner {
  constructor() {
    const clearFootpath: ((_: void) => void)[] = [];
    for (let x = 55; x <= 97; x += 1) {
      for (let y = 50; y <= 97; y += 1) {
        clearFootpath.push(...Footpath.Clear(new TileCoord(x, y)));
      }
    }

    super(new TileCoord(59, 56), [
      () => GameModify.SetSpeed(GameSpeed.Hyper),
      ...clearFootpath,
      ...new Hypercoaster().BuildUZ000(80, 62, 2, 36),
      ...new Hypercoaster().BuildUZ000(75, 65, 2, 36),
      ...new Hypercoaster().BuildUZ000(70, 68, 2, 36),
      () => ParkModify.SetLoan(0)
    ]);
  }
}
