import RideBuild from "../../actions/RideBuild";
import RideModify from "../../actions/RideModify";
import { RideStatus } from "../../enums/RideStatus";
import { RideType } from "../../enums/RideType";
import { TrackElemType } from "../../enums/TrackElemType";
import TileCoord from "../../map/TileCoord";
import MapUtilities from "../../utilities/MapUtilities";
import Ride from "../Ride";

export default class Shop extends Ride {
  constructor(private type: RideType, identifiers: string[]) {
    super(identifiers);
  }

  public Build(location: TileCoord, direction: number): ((data: void) => void)[] {
    const actions = [];
    let currentRideId: number = 0;

    actions.push(() => RideBuild.Create(this.type, this.VehicleId,
      (result: RideCreateActionResult) => {
        if (result.ride !== undefined) {
          currentRideId = result.ride;
        }
      }));

    const baseHeight = MapUtilities.maxHeight([location]);
    actions.push(() => RideBuild.PlaceTrack(currentRideId, location, baseHeight,
      direction, TrackElemType.FlatTrack1x1A, this.type));
    actions.push(() => RideModify.Status(currentRideId, RideStatus.Open));

    return actions;
  }
}
