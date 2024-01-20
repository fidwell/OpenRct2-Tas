import GameModify from "../../actions/GameSetSpeed";
import Scenery from "../../actions/Scenery";
import { GameSpeed } from "../../enums/GameSpeed";
import TileCoord from "../../map/TileCoord";
import CorkscrewRollerCoaster from "../../rides/rollerCoasters/CorkscrewRollerCoaster";
import ScenarioRunner from "../ScenarioRunner";

export default class CradleOfCivilization extends ScenarioRunner {
  constructor() {
    const clearScenery: ((_: void) => void)[] = [];
    for (let x = 38; x <= 49; x += 1) {
      for (let y = 37; y <= 49; y += 1) {
        clearScenery.push(...Scenery.RemoveSmall(new TileCoord(x, y)));
      }
    }

    const actions = [
      () => GameModify.SetSpeed(GameSpeed.Hyper),
      ...clearScenery,
      ...new CorkscrewRollerCoaster().BuildBoomerang(20, 66, 3, 63),
      ...new CorkscrewRollerCoaster().BuildBoomerang(25, 68, 3, 63),
      ...new CorkscrewRollerCoaster().BuildBoomerang(30, 70, 3, 63),
      ...new CorkscrewRollerCoaster().BuildBoomerang(35, 72, 3, 63),
      ...new CorkscrewRollerCoaster().BuildBoomerang(40, 74, 3, 63)
    ];
    super(new TileCoord(42, 61), actions);
  }
}
