import ScenarioRunner from "../ScenarioRunner";
import GameSetSpeed from "../../actions/GameSetSpeed";
import { ResearchFunding } from "../../enums/ResarchFunding";
import { ResearchPriorities } from "../../enums/ResearchPriorities";
import TileCoord from "../../map/TileCoord";
import RideUtilities from "../../rides/RideUtilities";
import LaunchedFreefall from "../../rides/LaunchedFreefall";

export default class HydroHills extends ScenarioRunner {
  private launchedFreefallIndex: number = -1;

  constructor() {
    const freefallHeight: number = 16;
    super([
      () => context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 200000 }),
      () => context.executeAction("parksetresearchfunding", <ParkSetResearchFundingArgs>{
        fundingAmount: ResearchFunding.Maximum,
        priorities: ResearchPriorities.Thrill
      }),
      () => {
        this.launchedFreefallIndex = RideUtilities.GetRideObjectIndex(LaunchedFreefall.Identifiers);
        GameSetSpeed.Turbo();
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
