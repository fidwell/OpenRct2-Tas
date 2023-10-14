import { RideType } from "../enums/RideType";
import RideUtilities from "./RideUtilities";
import { TrackElemType } from "../enums/TrackElemType";
import { RideStatus } from "../enums/RideStatus";

export default class RotoDrop {
  static Identifiers: string[] = ["rct2.ride.gdrop1"];
  static ObjectIndex: number = -1;

  static Init() {
    RotoDrop.ObjectIndex = RideUtilities.GetRideObjectIndex(RotoDrop.Identifiers);
  }

  static Build(x: number, y: number, z: number): ((data: void) => void)[] {
    const actions = [];
    let baseHeight: number = z;
    let currentRideId: number = 0;

    actions.push(() => context.executeAction("ridecreate", <RideCreateArgs>{
      rideType: RideType.RotoDrop,
      rideObject: RotoDrop.ObjectIndex,
      entranceObject: 0, // Probably plain
      colour1: 0,
      colour2: 0
    }, (result: RideCreateActionResult) => {
      if (result.ride !== undefined)
        currentRideId = result.ride;
    }));

    actions.push(() => context.executeAction("trackplace", <TrackPlaceArgs>{
      x: x * 32,
      y: y * 32,
      z: baseHeight * 8,
      direction: 0,
      ride: currentRideId,
      trackType: TrackElemType.TowerBase,
      rideType: RideType.RotoDrop,
      brakeSpeed: 0,
      colour: 0,
      seatRotation: 0,
      trackPlaceFlags: 0,
      isFromTrackDesign: false
    }));

    for (let i = 0; i < 35; i += 1) {
      actions.push(() => context.executeAction("trackplace", <TrackPlaceArgs>{
        x: x * 32,
        y: y * 32,
        z: (baseHeight + 12 + i * 4) * 8,
        direction: 0,
        ride: currentRideId,
        trackType: TrackElemType.TowerSection,
        rideType: RideType.RotoDrop,
        brakeSpeed: 0,
        colour: 0,
        seatRotation: 0,
        trackPlaceFlags: 0,
        isFromTrackDesign: false
      }));
    }

    actions.push(() => context.executeAction("rideentranceexitplace", <RideEntranceExitPlaceArgs>{
      x: (x - 2) * 32,
      y: y * 32,
      direction: 2,
      ride: currentRideId,
      station: 0,
      isExit: false
    }));

    actions.push(() => context.executeAction("rideentranceexitplace", <RideEntranceExitPlaceArgs>{
      x: (x + 2) * 32,
      y: y * 32,
      direction: 0,
      ride: currentRideId,
      station: 0,
      isExit: true
    }));

    actions.push(() => context.executeAction("ridesetstatus", <RideSetStatusArgs>{
      ride: currentRideId,
      status: RideStatus.Testing
    }));

    return actions;
  }
}
