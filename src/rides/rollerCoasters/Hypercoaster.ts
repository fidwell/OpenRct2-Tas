import RideBuild from "../../actions/RideBuild";
import RideModify from "../../actions/RideModify";
import { RideMode } from "../../enums/RideMode";
import { RideStatus } from "../../enums/RideStatus";
import { RideType } from "../../enums/RideType";
import { TrackElemType } from "../../enums/TrackElemType";
import Ride from "../Ride";
import { TrackPlacer } from "../TrackPlacer";

export default class Hypercoaster extends Ride {
  static Identifiers = [
    "rct2.ride.arrt2",
    "rct2ww.ride.anaconda"
  ];

  constructor() {
    super(Hypercoaster.Identifiers);
  }

  BuildUZ000(x: number, y: number, direction: number, baseHeight: number): ((data: void) => void)[] {
    let rideId: number = -1;
    const placer = new TrackPlacer(RideType.Hypercoaster, x, y, baseHeight, direction);
    
    return [
      () => RideBuild.Create(RideType.Hypercoaster, this.VehicleId,
        (result: RideCreateActionResult) => {
          if (result.ride !== undefined) {
            rideId = result.ride;
            placer.SetRideId(result.ride);
          }
        }),
      ...placer.BuildStation(2),
      placer.BuildPiece(TrackElemType.FlatToDown25),
      placer.BuildPiece(TrackElemType.Down25ToDown60),
      placer.BuildPiece(TrackElemType.RightQuarterTurn1TileDown60),
      placer.BuildPiece(TrackElemType.RightQuarterTurn1TileDown60),
      placer.BuildPiece(TrackElemType.Down60ToDown25),
      placer.BuildPiece(TrackElemType.Down25ToFlat),
      placer.BuildPiece(TrackElemType.Booster, false, 31),
      placer.BuildPiece(TrackElemType.Booster, false, 31),
      placer.BuildPiece(TrackElemType.FlatToUp25),
      placer.BuildPiece(TrackElemType.Up25ToUp60),
      placer.BuildPiece(TrackElemType.RightQuarterTurn1TileUp60),
      placer.BuildPiece(TrackElemType.RightQuarterTurn1TileUp60),
      placer.BuildPiece(TrackElemType.Up60ToUp25),
      placer.BuildPiece(TrackElemType.Up25ToFlat),
      placer.BuildEntrance(),
      placer.BuildExit(),
      () => RideModify.Mode(rideId, RideMode.PoweredLaunchPassingStation),
      () => RideModify.Trains(rideId, 1),
      () => RideModify.Circuits(rideId, 20),
      () => RideModify.Status(rideId, RideStatus.Testing)
    ];
  }
}
