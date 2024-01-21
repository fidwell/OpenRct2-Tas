import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import { GameSpeed } from "../../enums/GameSpeed";
import { ResearchFunding } from "../../enums/ResarchFunding";
import { ResearchPriorities } from "../../enums/ResearchPriorities";
import TileCoord from "../../map/TileCoord";
import CorkscrewRollerCoaster from "../../rides/rollerCoasters/CorkscrewRollerCoaster";
import RideUtilities from "../../utilities/RideUtilities";
import ScenarioRunner from "../ScenarioRunner";

export default class MineralPark extends ScenarioRunner {
  private corkscrewIndex: number = 0;
  private isWaitingForResearch = false;

  constructor() {
    super(new TileCoord(63, 47), [
      () => ParkModify.SetLoan(200000),
      () => ParkModify.SetResearch(ResearchFunding.Maximum, ResearchPriorities.Rollercoaster),
      () => {
        this.corkscrewIndex = RideUtilities.GetRideObjectIndex(CorkscrewRollerCoaster.Identifiers);
        GameModify.SetSpeed(GameSpeed.Hyper);
        this.isWaitingForResearch = true;
      }
    ]);
  }

  public override OnTick(): void {
    if (this.isWaitingForResearch === true && park.research.lastResearchedItem?.object === this.corkscrewIndex) {
      this.isWaitingForResearch = false;
      this.Actions.enqueueMany([
        ...new CorkscrewRollerCoaster().BuildBoomerang(59, 50, 0, 37),
        ...new CorkscrewRollerCoaster().BuildBoomerang(59, 45, 0, 37),
        ...new CorkscrewRollerCoaster().BuildBoomerang(59, 40, 0, 37),
        ...new CorkscrewRollerCoaster().BuildBoomerang(67, 33, 1, 37)
      ]);
    }

    super.OnTick();
  }
}
