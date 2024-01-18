import RideUtilities from "./RideUtilities";
import { RideStatus } from "../enums/RideStatus";
import { RideType } from "../enums/RideType";
import { TrackElemType } from "../enums/TrackElemType";
import { RideSetSetting } from "../enums/RideSetSetting";

export default class LaunchedFreefall {
  static Identifiers: string[] = ["rct2.ride.ssc1"];
  private vehicleObject: number = -1;

  constructor() {
    this.vehicleObject = RideUtilities.GetRideObjectIndex(LaunchedFreefall.Identifiers);
  }

  Build(x: number, y: number, height: number): ((data: void) => void)[] {
    const actions = [];
    let currentRideId: number = 0;

    const coordX = x * 32;
    const coordY = y * 32;

    // Find the highest surface level that the platform will sit on.
    // We could find a flat surface manually, but this should be reusable later
    const platformTileCoordinates = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 0], [0, 1],
      [1, -1], [1, 0], [1, 1],
      [-2, 0], [2, 0] // entrance and exit
    ].map(t => [t[0] + x, t[1] + y])
    .map(c => {
      const surfaceHere = <SurfaceElement>map.getTile(c[0], c[1]).elements.filter(e => e.type === "surface")[0];
      const surfaceHeight = surfaceHere.slope > 0 ? surfaceHere.baseHeight + 2 : surfaceHere.baseHeight;
      const baseHeight: number = Math.max(surfaceHeight * 8, surfaceHere.waterHeight);
      return baseHeight;
    });
    const baseHeight = Math.max(...platformTileCoordinates);

    actions.push(() => context.executeAction("ridecreate", <RideCreateArgs>{
      rideType: RideType.LaunchedFreefall,
      rideObject: this.vehicleObject,
      entranceObject: 0, // Probably plain
      colour1: 0,
      colour2: 0
    }, (result: RideCreateActionResult) => {
      if (result.ride !== undefined)
        currentRideId = result.ride;
    }));

    actions.push(() => context.executeAction("trackplace", <TrackPlaceArgs>{
      x: coordX,
      y: coordY,
      z: baseHeight,
      direction: 0,
      ride: currentRideId,
      trackType: TrackElemType.TowerBase,
      rideType: RideType.LaunchedFreefall,
      brakeSpeed: 0,
      colour: 0,
      seatRotation: 0,
      trackPlaceFlags: 0,
      isFromTrackDesign: false
    }));

    for (let i = 0; i < height; i += 1) {
      actions.push(() => context.executeAction("trackplace", <TrackPlaceArgs>{
        x: coordX,
        y: coordY,
        z: baseHeight + (12 + i * 4) * 8,
        direction: 0,
        ride: currentRideId,
        trackType: TrackElemType.TowerSection,
        rideType: RideType.LaunchedFreefall,
        brakeSpeed: 0,
        colour: 0,
        seatRotation: 0,
        trackPlaceFlags: 0,
        isFromTrackDesign: false
      }));
    }

    actions.push(() => context.executeAction("rideentranceexitplace", <RideEntranceExitPlaceArgs>{
      x: (x - 2) * 32,
      y: coordY,
      direction: 2,
      ride: currentRideId,
      station: 0,
      isExit: false
    }));

    actions.push(() => context.executeAction("rideentranceexitplace", <RideEntranceExitPlaceArgs>{
      x: (x + 2) * 32,
      y: coordY,
      direction: 0,
      ride: currentRideId,
      station: 0,
      isExit: true
    }));

    actions.push(() => context.executeAction("ridesetsetting", <RideSetSettingArgs>{
      ride: currentRideId,
      setting: RideSetSetting.Operation,
      value: 31 // 69 mph
    }));

    actions.push(() => context.executeAction("ridesetstatus", <RideSetStatusArgs>{
      ride: currentRideId,
      status: RideStatus.Testing
    }));

    return actions;
  }
}
