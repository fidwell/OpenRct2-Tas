import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import { GameSpeed } from "../../enums/GameSpeed";
import { ResearchFunding } from "../../enums/ResarchFunding";
import { ResearchPriorities } from "../../enums/ResearchPriorities";
import CorkscrewRollerCoaster from "../../rides/rollerCoasters/CorkscrewRollerCoaster";
import RideUtilities from "../../utilities/RideUtilities";
import ScenarioRunner from "../ScenarioRunner";

export default class MineralPark extends ScenarioRunner {
  corkscrewIndex: number = 0;

  constructor() {
    super([
      () => ParkModify.SetLoan(200000),
      () => ParkModify.SetResearch(ResearchFunding.Maximum, ResearchPriorities.Rollercoaster),
      () => {
        this.corkscrewIndex = RideUtilities.GetRideObjectIndex(CorkscrewRollerCoaster.Identifiers);
        GameModify.SetSpeed(GameSpeed.Hyper);
      },
      () => {
        this.IsWaiting = true;
        if (park.research.lastResearchedItem?.object === this.corkscrewIndex) {
          this.IsWaiting = false;
        }
      },
      ...new CorkscrewRollerCoaster().BuildBoomerang(59, 50, 0, 37),
      ...new CorkscrewRollerCoaster().BuildBoomerang(59, 45, 0, 37),
      ...new CorkscrewRollerCoaster().BuildBoomerang(59, 40, 0, 37),
      ...new CorkscrewRollerCoaster().BuildBoomerang(67, 33, 1, 37)
    ]);
  }
}
