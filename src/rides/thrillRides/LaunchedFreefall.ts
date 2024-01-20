import RideBuild from "../../actions/RideBuild";
import RideModify from "../../actions/RideModify";
import { RideStatus } from "../../enums/RideStatus";
import { RideType } from "../../enums/RideType";
import { TrackElemType } from "../../enums/TrackElemType";
import TileCoord from "../../map/TileCoord";
import MapUtilities from "../../utilities/MapUtilities";
import Ride from "../Ride";

export default class LaunchedFreefall extends Ride {
  static Identifiers: string[] = ["rct2.ride.ssc1"];

  constructor() {
    super(LaunchedFreefall.Identifiers)
  }

  Build(location: TileCoord, height: number): ((data: void) => void)[] {
    const actions = [];
    let currentRideId: number = 0;

    const exitLocation = new TileCoord(location.x - 2, location.y);
    const entranceLocation = new TileCoord(location.x + 2, location.y);

    const platformTiles = location.NeighborsEight();
    platformTiles.push(exitLocation);
    platformTiles.push(entranceLocation);
    const baseHeight = MapUtilities.maxHeight(platformTiles);

    actions.push(() => {
      RideBuild.Create(RideType.LaunchedFreefall, this.VehicleId,
        (result: RideCreateActionResult) => {
          if (result.ride !== undefined) {
            currentRideId = result.ride;
          }
        });
    });

    actions.push(() => RideBuild.PlaceTrack(currentRideId, location, baseHeight,
      0, TrackElemType.TowerBase, RideType.LaunchedFreefall));

    for (let i = 0; i < height; i += 1) {
      actions.push(() => RideBuild.PlaceTrack(currentRideId, location, baseHeight + (12 + i * 4) * 8,
        0, TrackElemType.TowerSection, RideType.LaunchedFreefall));
    }

    actions.push(() => RideBuild.PlaceEntrance(currentRideId, entranceLocation, 2));
    actions.push(() => RideBuild.PlaceExit(currentRideId, exitLocation, 0));
    actions.push(() => RideModify.LaunchSpeed(currentRideId, 31)); // 69 mph
    actions.push(() => RideModify.Status(currentRideId, RideStatus.Testing));
    return actions;
  }
}
