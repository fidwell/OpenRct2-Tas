import Footpath from "../../actions/Footpath";
import RideBuild from "../../actions/RideBuild";
import RideModify from "../../actions/RideModify";
import { RideMode } from "../../enums/RideMode";
import { RideStatus } from "../../enums/RideStatus";
import { RideType } from "../../enums/RideType";
import { TrackElemType } from "../../enums/TrackElemType";
import TileCoord from "../../map/TileCoord";
import DirectionUtilities from "../../utilities/DirectionUtilities";
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

    // RCT1 trains can get away with a 3-tile station.
    // RCT2 trains need 4 tiles.
    const trainType = objectManager.getObject("ride", this.VehicleId);
    const stationLength: number = trainType.identifier.indexOf("rct1") == 0 ? 3 : 4;

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
      ...placer.BuildStation(stationLength),
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

  BuildTinyCork(x: number, y: number, direction: number, baseHeight: number): ((data: void) => void)[] {
    let rideId: number = -1;
    const placer = new TrackPlacer(RideType.CorkscrewRollerCoaster, x, y, baseHeight, direction);

    const startTile = new TileCoord(x, y);
    const entranceTile = DirectionUtilities.Travel(DirectionUtilities.Travel(startTile, direction, 2), (direction + 3) % 4, 1);
    const exitTile = DirectionUtilities.Travel(DirectionUtilities.Travel(startTile, direction, 1), (direction + 3) % 4, 1);
    const finalPathTile = DirectionUtilities.Travel(startTile, (direction + 3) % 4, 2);

    return [
      () => RideBuild.Create(RideType.CorkscrewRollerCoaster, this.VehicleId,
        (result: RideCreateActionResult) => {
          if (result.ride !== undefined) {
            rideId = result.ride;
            placer.SetRideId(result.ride);
          }
        }),
      ...placer.BuildStation(3),
      placer.BuildPiece(TrackElemType.LeftCorkscrewUp),
      () => RideBuild.PlaceEntrance(rideId, entranceTile, (direction + 1) % 4),
      () => RideBuild.PlaceExit(rideId, exitTile, (direction + 1) % 4),
      () => RideModify.CarsPerTrain(rideId, 2),
      () => RideModify.Mode(rideId, RideMode.PoweredLaunchWithoutPassingStation),
      () => RideModify.LaunchSpeed(rideId, 10),
      () => Footpath.PlaceQueue(DirectionUtilities.Travel(entranceTile, (direction + 3) % 4, 1), baseHeight),
      () => Footpath.PlacePath(DirectionUtilities.Travel(exitTile, (direction + 3) % 4, 1), baseHeight),
      () => Footpath.PlacePath(finalPathTile, baseHeight),
      () => RideModify.Status(rideId, RideStatus.Open),
    ];
  }
}
