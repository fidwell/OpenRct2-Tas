import RideUtilities from "./RideUtilities";
import { TrackPlacer } from "./TrackPlacer";
import RideModify from "../actions/RideModify";
import { RideMode } from "../enums/RideMode";
import { RideStatus } from "../enums/RideStatus";
import { RideType } from "../enums/RideType";
import { TrackElemType } from "../enums/TrackElemType";
import RideBuild from "../actions/RideBuild";

export default class LoopingRollerCoaster {
  static Identifiers: string[] = ["rct2tt.ride.polchase"];
  private vehicleObject: number = -1;

  constructor() {
    this.vehicleObject = RideUtilities.GetRideObjectIndex(LoopingRollerCoaster.Identifiers);
  }

  BuildShuttleLoop(x: number, y: number, z: number, direction: number): ((data: void) => void)[] {
    let rideId: number = -1;
    const placer = new TrackPlacer(RideType.LoopingRollerCoaster, x, y, z, direction);

    return [
      () => RideBuild.Create(RideType.LoopingRollerCoaster, this.vehicleObject,
        (result: RideCreateActionResult) => {
          if (result.ride !== undefined) {
            rideId = result.ride;
            placer.SetRideId(result.ride);
          }
        }),
      placer.BuildPiece(TrackElemType.BeginStation),
      placer.BuildPiece(TrackElemType.MiddleStation),
      placer.BuildPiece(TrackElemType.MiddleStation),
      placer.BuildPiece(TrackElemType.EndStation),
      placer.BuildPiece(TrackElemType.FlatToUp25),
      placer.BuildPiece(TrackElemType.RightVerticalLoop),
      placer.BuildPiece(TrackElemType.Down25ToFlat),
      placer.BuildPiece(TrackElemType.FlatToUp25),
      placer.BuildPiece(TrackElemType.Up25ToUp60),
      placer.BuildPiece(TrackElemType.Up60),
      placer.BuildPiece(TrackElemType.Up60),
      placer.BuildPiece(TrackElemType.Up60),
      placer.BuildEntrance(),
      placer.BuildExit(),
      () => RideModify.Mode(rideId, RideMode.PoweredLaunchWithoutPassingStation),
      () => RideModify.LaunchSpeed(rideId, 18),
      // (40 mph or 64 km/h) // 10–27 are the only valid numbers
      () => RideModify.Status(rideId, RideStatus.Testing)
    ];
  }
}
