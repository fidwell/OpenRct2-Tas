import { TrackElemType } from "../enums/TrackElemType";

export class TrackPlacer {
  private rideId: number;
  private startX: number;
  private startY: number;
  private startDir: number;

  constructor(
    private rideType: number,
    private x: number,
    private y: number,
    private z: number,
    private direction: number) {
    this.rideId = -1;
    this.startX = x;
    this.startY = y;
    this.startDir = direction;
  }

  SetRideId(rideId: number) {
    this.rideId = rideId;
  }

  BuildPiece(trackElemType: TrackElemType): ((data: void) => void) {
    return () => {
      context.executeAction("trackplace", <TrackPlaceArgs>{
        x: this.x * 32,
        y: this.y * 32,
        z: this.z * 8,
        direction: this.direction,
        ride: this.rideId,
        trackType: trackElemType,
        rideType: this.rideType,
        brakeSpeed: 0,
        colour: 0,
        seatRotation: 0,
        trackPlaceFlags: 0,
        isFromTrackDesign: false
      });

      // ----
      // Calculate where the iterator will be next
      // ----

      let forward: number = 0;
      let right: number = 0;
      let turn: number = 0; // 1 = 90 degrees right, etc.
      switch (trackElemType) {
        case TrackElemType.EndStation:
        case TrackElemType.BeginStation:
        case TrackElemType.MiddleStation:
        case TrackElemType.Down25ToFlat:
          forward += 1;
          break;

        case TrackElemType.Up60:
          forward += 1;
          this.z += 8;
          break;

        case TrackElemType.FlatToUp25:
        case TrackElemType.Up25ToFlat:
          forward += 1;
          this.z += 1;
          break;

        case TrackElemType.Up25ToUp60:
          forward += 1;
          this.z += 4;
          break;

        case TrackElemType.RightVerticalLoop:
          forward += 2;
          right += 1;
          this.z -= 1;
          break;

        default:
          console.log(`Unsupported track element type: ${trackElemType}`);
          break;
      }

      /* DIRECTION:
       * 0 = Headed towards x = 0
       * 1 = Headed towards y = ∞
       * 2 = Headed towards x = ∞
       * 3 = Headed towards y = 0
       */

      switch (this.direction) {
        case 0:
          this.x -= forward;
          this.y += right;
          break;
        case 1:
          this.x += right;
          this.y += forward;
          break;
        case 2:
          this.x += forward;
          this.y -= right;
          break;
        case 3:
          this.x -= right;
          this.y -= forward;
          break;
      }

      this.direction = (this.direction + turn) % 4;
    };
  }

  BuildEntrance = (): ((data: void) => void) => this.BuildEntranceExit(false);
  BuildExit = (): ((data: void) => void) => this.BuildEntranceExit(true);

  private BuildEntranceExit(isExit: boolean): ((data: void) => void) {
    return () => context.executeAction("rideentranceexitplace", <RideEntranceExitPlaceArgs>{
      x: (this.startDir % 2 === 0 ? this.startX : (this.startX + (isExit ? 1 : -1))) * 32,
      y: (this.startDir % 2 === 1 ? this.startY : (this.startY + (isExit ? 1 : -1))) * 32,
      direction: (this.startDir + (isExit ? 1 : 3)) % 4,
      ride: this.rideId,
      station: 0,
      isExit: isExit
    });
  }
}
