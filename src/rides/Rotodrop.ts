import RideUtilities from "./RideUtilities";
import { RideType } from "../enums/RideType";
import { RideStatus } from "../enums/RideStatus";
import { TrackElemType } from "../enums/TrackElemType";
import TileCoord from "../map/TileCoord";
import MapUtilities from "../utilities/MapUtilities";

export default class RotoDrop {
  static Identifiers: string[] = ["rct2.ride.gdrop1"];
  private vehicleObject: number = -1;

  constructor() {
    this.vehicleObject = RideUtilities.GetRideObjectIndex(RotoDrop.Identifiers);
  }

  Build(location: TileCoord, height: number): ((data: void) => void)[] {
    const actions = [];
    let currentRideId: number = 0;
    
    const exitLocation = new TileCoord(location.x - 2, location.y);
    const entranceLocation = new TileCoord(location.x + 2, location.y);
    
    const platformTiles = location.NeighborsEight();
    platformTiles.push(exitLocation);
    platformTiles.push(entranceLocation);
    const baseHeight = MapUtilities.maxHeight(platformTiles);

    actions.push(() => context.executeAction("ridecreate", <RideCreateArgs>{
      rideType: RideType.RotoDrop,
      rideObject: this.vehicleObject,
      entranceObject: 0, // Probably plain
      colour1: 0,
      colour2: 0
    }, (result: RideCreateActionResult) => {
      if (result.ride !== undefined)
        currentRideId = result.ride;
    }));

    actions.push(() => context.executeAction("trackplace", <TrackPlaceArgs>{
      x: location.WorldX,
      y: location.WorldY,
      z: baseHeight,
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

    for (let i = 0; i < height; i += 1) {
      actions.push(() => context.executeAction("trackplace", <TrackPlaceArgs>{
        x: location.WorldX,
        y: location.WorldY,
        z: baseHeight + (12 + i * 4) * 8,
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
      x: exitLocation.WorldX,
      y: exitLocation.WorldY,
      direction: 2,
      ride: currentRideId,
      station: 0,
      isExit: false
    }));

    actions.push(() => context.executeAction("rideentranceexitplace", <RideEntranceExitPlaceArgs>{
      x: entranceLocation.WorldX,
      y: entranceLocation.WorldY,
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
