import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import Staff from "../../actions/Staff";
import { EntertainerCostume } from "../../enums/EntertainerCostume";
import { GameSpeed } from "../../enums/GameSpeed";
import { MarketingType } from "../../enums/MarketingType";
import TileCoord from "../../map/TileCoord";
import CorkscrewRollerCoaster from "../../rides/rollerCoasters/CorkscrewRollerCoaster";
import ActionUtilities from "../../utilities/ActionUtilities";
import ScenarioRunner from "../ScenarioRunner";

export default class Funtopia extends ScenarioRunner {
  constructor() {
    super(new TileCoord(58, 77), [
      () => GameModify.SetSpeed(GameSpeed.Hyper),
      () => ParkModify.SetLoan(150000),
      () => ParkModify.SetMarketing(MarketingType.Park, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(36, 69, 1, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(39, 69, 1, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(34, 67, 3, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(37, 67, 3, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(40, 67, 3, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(43, 67, 3, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(41, 77, 0, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(60, 67, 3, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(63, 67, 2, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(63, 70, 2, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(63, 73, 2, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(63, 76, 2, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(61, 71, 0, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(61, 74, 0, 12),
      ...ActionUtilities.Repeat(() => Staff.HireMechanic(), 15),
      ...ActionUtilities.Repeat(() => Staff.HireHandyman(), 10),
      ...ActionUtilities.Repeat(() => Staff.HireEntertainer(EntertainerCostume.Panda), 10),
      () => {
        this.IsWaiting = true;
        if (date.monthsElapsed === 1) {
          this.IsWaiting = false;
        }
      },
      () => ParkModify.SetMarketing(MarketingType.Ride, 6, 0), // Grapevine
      () => {
        this.IsWaiting = true;
        if (date.monthsElapsed === 3) {
          this.IsWaiting = false;
        }
      },
      () => ParkModify.SetMarketing(MarketingType.Park, 12),
      () => {
        this.IsWaiting = true;
        if (date.monthsElapsed === 6) {
          this.IsWaiting = false;
        }
      },
      () => ParkModify.SetMarketing(MarketingType.Park, 12)
    ]);
  }
}
