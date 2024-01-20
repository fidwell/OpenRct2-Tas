import Footpath from "../../actions/Footpath";
import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import RideModify from "../../actions/RideModify";
import Scenery from "../../actions/Scenery";
import { GameSpeed } from "../../enums/GameSpeed";
import TileCoord from "../../map/TileCoord";
import LoopingRollerCoaster from "../../rides/rollerCoasters/LoopingRollerCoaster";
import ScenarioRunner from "../ScenarioRunner";

export default class Renovation extends ScenarioRunner {
  constructor() {
    const clearTiles: ((_: void) => void)[] = [];
    for (let x = 45; x <= 60; x += 1) {
      for (let y = 40; y <= 70; y += 1) {
        clearTiles.push(...Footpath.Remove(new TileCoord(x, y)));
        clearTiles.push(...Scenery.RemoveLarge(new TileCoord(x, y)));
        clearTiles.push(...Scenery.RemoveSmall(new TileCoord(x, y)));
        clearTiles.push(...Scenery.RemoveWall(new TileCoord(x, y)));
      }
    }

    super(new TileCoord(59, 56), [
      () => GameModify.SetSpeed(GameSpeed.Hyper),
      ...clearTiles,
      () => RideModify.Demolish(3), // Suspended Swinging Coaster 1
      () => RideModify.Demolish(15), // Space Rings 1
      () => RideModify.Demolish(17), // Space Rings 2
      () => RideModify.Demolish(24), // Monorail 1
      () => ParkModify.SetLoan(0),
      ...new LoopingRollerCoaster().BuildShuttleLoop(60, 42, 14, 0),
      ...new LoopingRollerCoaster().BuildShuttleLoop(60, 46, 14, 0),
      ...new LoopingRollerCoaster().BuildShuttleLoop(60, 50, 14, 0),
      ...new LoopingRollerCoaster().BuildShuttleLoop(60, 54, 14, 0),
      ...new LoopingRollerCoaster().BuildShuttleLoop(60, 58, 14, 0),
      ...new LoopingRollerCoaster().BuildShuttleLoop(60, 62, 14, 0),
      ...new LoopingRollerCoaster().BuildShuttleLoop(60, 66, 14, 0)
    ]);
  }
}
