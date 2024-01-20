import RideBuild from "../actions/RideBuild";
import { TrackElemType } from "../enums/TrackElemType";
import TileCoord from "../map/TileCoord";

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
      RideBuild.PlaceTrack(this.rideId, new TileCoord(this.x, this.y),
        this.z * 8, this.direction, trackElemType, this.rideType);

      // ----
      // Calculate where the iterator will be next
      // ----

      let forward: number = 0;
      let right: number = 0;
      let turn: number = 0; // 1 = 90 degrees right, etc.
      switch (trackElemType) {
        case TrackElemType.Flat: // 0
        case TrackElemType.EndStation:
        case TrackElemType.BeginStation:
        case TrackElemType.MiddleStation:
        case TrackElemType.Down25ToFlat:
          forward += 1;
          break;

        case TrackElemType.Up60: // 5
          forward += 1;
          this.z += 8;
          break;

        case TrackElemType.FlatToUp25: // 6
        case TrackElemType.Up25ToFlat:
          forward += 1;
          this.z += 1;
          break;

        case TrackElemType.Up25ToUp60: // 7
          forward += 1;
          this.z += 4;
          break;

        case TrackElemType.LeftQuarterTurn5Tiles: // 16
          forward += 2;
          right -= 3;
          turn -= 1;
          break;

        case TrackElemType.RightVerticalLoop: // 41
          forward += 2;
          right += 1;
          this.z -= 1;
          break;

        case TrackElemType.LeftQuarterTurn3Tiles: //42
          forward += 1;
          right -= 1;
          turn -= 1;
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
    const x = (this.startDir % 2 === 0 ? this.startX : (this.startX + (isExit ? 1 : -1)));
    const y = (this.startDir % 2 === 1 ? this.startY : (this.startY + (isExit ? 1 : -1)));
    const location = new TileCoord(x, y);
    const direction = (this.startDir + (isExit ? 1 : 3)) % 4;
    return isExit
      ? () => RideBuild.PlaceExit(this.rideId, location, direction)
      : () => RideBuild.PlaceEntrance(this.rideId, location, direction);
  }
}
