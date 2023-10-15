import { RideType } from "../enums/RideType";
import RideUtilities from "./RideUtilities";
import { TrackElemType } from "../enums/TrackElemType";
import { RideSetSetting } from "../enums/RideSetSetting";
import { RideMode } from "../enums/RideMode";
import { TrackPlacer } from "./TrackPlacer";
import { RideStatus } from "../enums/RideStatus";

export default class LoopingRollerCoaster {
  static Identifiers: string[] = ["rct2tt.ride.ganstrcr"];
  private objectIndex: number = -1;

  constructor() {
    this.objectIndex = RideUtilities.GetRideObjectIndex(LoopingRollerCoaster.Identifiers);
  }

  BuildShuttleLoop(x: number, y: number, z: number, direction: number): ((data: void) => void)[] {
    const actions = [];
    let rideId: number = -1;
    const placer = new TrackPlacer(RideType.LoopingRollerCoaster, x, y, z, direction);

    actions.push(() => context.executeAction("ridecreate", <RideCreateArgs>{
      rideType: RideType.LoopingRollerCoaster,
      rideObject: this.objectIndex,
      entranceObject: 0, // Probably plain
      colour1: 0,
      colour2: 0
    }, (result: RideCreateActionResult) => {
      if (result.ride !== undefined) {
        rideId = result.ride;
        placer.SetRideId(result.ride);
      }
    }));

    return [
      ...actions,
      // Build station
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
      // Set to powered launch (without passing station)
      () => context.executeAction("ridesetsetting", <RideSetSettingArgs>{
        ride: rideId,
        setting: RideSetSetting.Mode,
        value: RideMode.PoweredLaunch
      }),
      // Set launch speed to 40 mph
      () => context.executeAction("ridesetsetting", <RideSetSettingArgs>{
        ride: rideId,
        setting: RideSetSetting.Operation,
        value: 18 // (40 mph or 64 km/h) // 10–27 are the only valid numbers
      }),
      // Test
      () => context.executeAction("ridesetstatus", <RideSetStatusArgs>{
        ride: rideId,
        status: RideStatus.Testing
      })
    ];
  }
}
