import RideBuild from "../../actions/RideBuild";
import RideModify from "../../actions/RideModify";
import { RideMode } from "../../enums/RideMode";
import { RideStatus } from "../../enums/RideStatus";
import { RideType } from "../../enums/RideType";
import { TrackElemType } from "../../enums/TrackElemType";
import Ride from "../Ride";
import { TrackPlacer } from "../TrackPlacer";

export default class CorkscrewRollerCoaster extends Ride {
  static Identifiers = [
    "rct1.ride.corkscrew_trains",
    "rct2.ride.arrt1",
    "rct2ww.ride.bullet",
    "rct2ww.ride.congaeel",
    "rct2ww.ride.dragon",
    "rct2ww.ride.gratwhte",
    "rct2ww.ride.caddilac",
    "rct2ww.ride.seals",
  ];

  constructor() {
    super(CorkscrewRollerCoaster.Identifiers);
  }

  BuildBoomerang(x: number, y: number, direction: number, baseHeight: number): ((data: void) => void)[] {
    let rideId: number = -1;
    const placer = new TrackPlacer(RideType.CorkscrewRollerCoaster, x, y, baseHeight, direction);

    return [
      () => RideBuild.Create(RideType.CorkscrewRollerCoaster, this.VehicleId,
        (result: RideCreateActionResult) => {
          if (result.ride !== undefined) {
            rideId = result.ride;
            placer.SetRideId(result.ride);
          }
        }),
      placer.BuildPiece(TrackElemType.Down60, true),
      placer.BuildPiece(TrackElemType.Down60, true),
      placer.BuildPiece(TrackElemType.Down60, true),
      placer.BuildPiece(TrackElemType.Down60ToDown25, true),
      placer.BuildPiece(TrackElemType.Down25ToFlat, true),
      ...placer.BuildStation(3),
      placer.BuildPiece(TrackElemType.FlatToUp25),
      placer.BuildPiece(TrackElemType.HalfLoopUp),
      placer.BuildPiece(TrackElemType.RightCorkscrewDown),
      placer.BuildPiece(TrackElemType.RightCorkscrewUp),
      placer.BuildPiece(TrackElemType.HalfLoopDown),
      placer.BuildPiece(TrackElemType.Down25ToFlat),
      placer.BuildPiece(TrackElemType.Flat),
      placer.BuildPiece(TrackElemType.FlatToUp25),
      placer.BuildPiece(TrackElemType.LeftVerticalLoop),
      placer.BuildPiece(TrackElemType.Down25ToFlat),
      placer.BuildPiece(TrackElemType.FlatToUp25),
      placer.BuildPiece(TrackElemType.Up25ToUp60),
      placer.BuildPiece(TrackElemType.Up60),
      placer.BuildPiece(TrackElemType.Up60),
      placer.BuildPiece(TrackElemType.Up60),
      placer.BuildEntrance(),
      placer.BuildExit(),
      () => RideModify.Mode(rideId, RideMode.ReverseInclineLaunchedShuttle),
      () => RideModify.Status(rideId, RideStatus.Testing)
    ];
  }
}
