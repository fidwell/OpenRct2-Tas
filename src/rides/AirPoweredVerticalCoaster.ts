import { RideStatus } from "../enums/RideStatus";
import { RideType } from "../enums/RideType";
import { TrackElemType } from "../enums/TrackElemType";
import RideUtilities from "./RideUtilities";
import { TrackPlacer } from "./TrackPlacer";

export default class AirPoweredVerticalCoaster {
  static Identifiers: string[] = ["rct2.ride.thcar"];
  private objectIndex: number = -1;

  constructor() {
    this.objectIndex = RideUtilities.GetRideObjectIndex(AirPoweredVerticalCoaster.Identifiers);
  }

  BuildTinyLoop(x: number, y: number, z: number, direction: number): ((data: void) => void)[] {
    let rideId: number = -1;
    const placer = new TrackPlacer(RideType.AirPoweredVerticalCoaster, x, y, z, direction);

    return [
      () => context.executeAction("ridecreate", <RideCreateArgs>{
        rideType: RideType.AirPoweredVerticalCoaster,
        rideObject: this.objectIndex,
        entranceObject: 0, // Probably plain
        colour1: 0,
        colour2: 0
      }, (result: RideCreateActionResult) => {
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
      () => context.executeAction("ridesetstatus", <RideSetStatusArgs>{
        ride: rideId,
        status: RideStatus.Testing
      })
    ];
  }
}
