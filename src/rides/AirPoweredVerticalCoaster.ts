import RideUtilities from "./RideUtilities";
import { TrackPlacer } from "./TrackPlacer";
import RideBuild from "../actions/RideBuild";
import RideModify from "../actions/RideModify";
import { RideStatus } from "../enums/RideStatus";
import { RideType } from "../enums/RideType";
import { TrackElemType } from "../enums/TrackElemType";

export default class AirPoweredVerticalCoaster {
  static Identifiers: string[] = ["rct2.ride.thcar"];
  private vehicleObject: number = -1;

  constructor() {
    this.vehicleObject = RideUtilities.GetRideObjectIndex(AirPoweredVerticalCoaster.Identifiers);
  }

  BuildTinyLoop(x: number, y: number, z: number, direction: number): ((data: void) => void)[] {
    let rideId: number = -1;
    const placer = new TrackPlacer(RideType.AirPoweredVerticalCoaster, x, y, z, direction);

    return [
      () => RideBuild.Create(RideType.AirPoweredVerticalCoaster, this.vehicleObject,
        (result: RideCreateActionResult) => {
          if (result.ride !== undefined) {
            rideId = result.ride;
            placer.SetRideId(result.ride);
          }
        }),
      placer.BuildPiece(TrackElemType.BeginStation),
      placer.BuildPiece(TrackElemType.EndStation),
      placer.BuildPiece(TrackElemType.LeftQuarterTurn5Tiles),
      placer.BuildPiece(TrackElemType.LeftQuarterTurn5Tiles),
      placer.BuildPiece(TrackElemType.Flat),
      placer.BuildPiece(TrackElemType.Flat),
      placer.BuildPiece(TrackElemType.LeftQuarterTurn5Tiles),
      placer.BuildPiece(TrackElemType.LeftQuarterTurn5Tiles),
      placer.BuildEntrance(),
      placer.BuildExit(),
      () => RideModify.Status(rideId, RideStatus.Testing)
    ];
  }
}
