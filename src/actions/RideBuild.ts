import { RideType } from "../enums/RideType";
import { TrackElemType } from "../enums/TrackElemType";
import { TrackPlaceFlags } from "../enums/TrackPlaceFlags";
import TileCoord from "../map/TileCoord";

export default class RideBuild {
  public static Create(type: RideType, vehicleObject: number, callback?: (result: RideCreateActionResult) => void) {
    context.executeAction("ridecreate", <RideCreateArgs>{
      rideType: type,
      rideObject: vehicleObject,
      entranceObject: 0, // Probably plain, but it's a loaded object so that's not guaranteed
      colour1: 0,
      colour2: 0
    }, callback);
  }

  public static PlaceTrack(
    rideId: number,
    location: TileCoord,
    baseHeight: number,
    direction: number,
    trackType: TrackElemType,
    rideType: RideType,
    hasChain: boolean = false) {
      context.executeAction("trackplace", <TrackPlaceArgs>{
        x: location.WorldX,
        y: location.WorldY,
        z: baseHeight,
        direction,
        ride: rideId,
        trackType,
        rideType,
        brakeSpeed: 0,
        colour: 0,
        seatRotation: 0,
        trackPlaceFlags: hasChain ? TrackPlaceFlags.LiftHill : 0,
        isFromTrackDesign: false
      });
  }

  public static PlaceEntrance(rideId: number, location: TileCoord, direction: number) {
    this.PlaceEntranceExit(rideId, location, direction, false);
  }

  public static PlaceExit(rideId: number, location: TileCoord, direction: number) {
    this.PlaceEntranceExit(rideId, location, direction, true);
  }

  private static PlaceEntranceExit(rideId: number, location: TileCoord, direction: number, isExit: boolean) {
    context.executeAction("rideentranceexitplace", <RideEntranceExitPlaceArgs>{
      x: location.WorldX,
      y: location.WorldY,
      direction,
      ride: rideId,
      station: 0,
      isExit
    });
  }
}
