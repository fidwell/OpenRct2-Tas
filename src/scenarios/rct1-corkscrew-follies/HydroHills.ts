import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import { GameSpeed } from "../../enums/GameSpeed";
import { ResearchFunding } from "../../enums/ResarchFunding";
import { ResearchPriorities } from "../../enums/ResearchPriorities";
import TileCoord from "../../map/TileCoord";
import LaunchedFreefall from "../../rides/thrillRides/LaunchedFreefall";
import RideUtilities from "../../utilities/RideUtilities";
import ScenarioRunner from "../ScenarioRunner";

export default class HydroHills extends ScenarioRunner {
  private launchedFreefallIndex: number = -1;

  constructor() {
    const freefallHeight: number = 16;
    super(new TileCoord(85, 60), [
      () => ParkModify.SetLoan(200000),
      () => ParkModify.SetResearch(ResearchFunding.Maximum, ResearchPriorities.Thrill),
      () => {
        this.launchedFreefallIndex = RideUtilities.GetRideObjectIndex(LaunchedFreefall.Identifiers);
        GameModify.SetSpeed(GameSpeed.Hyper);
      },
      () => {
        this.IsWaiting = true;
        if (park.research.lastResearchedItem?.object === this.launchedFreefallIndex) {
          this.IsWaiting = false;
        }
      },
      ...new LaunchedFreefall().Build(new TileCoord(96, 56), freefallHeight),
      ...new LaunchedFreefall().Build(new TileCoord(96, 62), freefallHeight),
      ...new LaunchedFreefall().Build(new TileCoord(89, 58), freefallHeight),
      ...new LaunchedFreefall().Build(new TileCoord(101, 58), freefallHeight),
      ...new LaunchedFreefall().Build(new TileCoord(106, 68), freefallHeight),
      ...new LaunchedFreefall().Build(new TileCoord(103, 74), freefallHeight),
      ...new LaunchedFreefall().Build(new TileCoord(89, 66), freefallHeight),
      ...new LaunchedFreefall().Build(new TileCoord(71, 54), freefallHeight)
    ]);
  }
}
