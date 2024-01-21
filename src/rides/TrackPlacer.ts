import RideBuild from "../actions/RideBuild";
import { RideType } from "../enums/RideType";
import { TrackElemType } from "../enums/TrackElemType";
import TileCoord from "../map/TileCoord";
import DirectionUtilities from "../utilities/DirectionUtilities";

export class TrackPlacer {
  private rideId: number;
  private startX: number;
  private startY: number;
  private startDir: number;
  private stationLocation: TileCoord;

  constructor(
    private rideType: RideType,
    private x: number,
    private y: number,
    private z: number,
    private direction: number) {
    this.rideId = -1;
    this.startX = x;
    this.startY = y;
    this.startDir = direction;
    this.stationLocation = new TileCoord(this.startX, this.startY);
  }

  SetRideId(rideId: number) {
    this.rideId = rideId;
  }

  BuildPiece(trackElemType: TrackElemType, hasChain = false, boosterSpeed = 0): ((data: void) => void) {
    return () => {
      // ----
      // Calculate where the iterator will be next
      // ----

      let forward: number = 0;
      let right: number = 0;
      let up: number = 0;
      let turn: number = 0; // 1 = 90 degrees right, etc.
      let isUninverting: boolean = false;

      switch (trackElemType) {
        case TrackElemType.Flat: // 0
        case TrackElemType.Booster:
          forward += 1;
          break;

        case TrackElemType.EndStation: // 1
        case TrackElemType.BeginStation:
        case TrackElemType.MiddleStation:
          this.stationLocation = new TileCoord(this.x, this.y);
          forward += 1;
          break;

        case TrackElemType.Up60: // 5
          forward += 1;
          up += 8;
          break;

        case TrackElemType.FlatToUp25: // 6
          forward += 1;
          up += 1;
          break;

        case TrackElemType.Up25ToUp60: // 7
          forward += 1;
          up += 4;
          break;

        case TrackElemType.Up60ToUp25: // 8
          forward += 1;
          up += 4;
          break;

        case TrackElemType.Up25ToFlat: // 9
          forward += 1;
          up += 1;
          break;

        case TrackElemType.Down60: // 11
          forward += 1;
          up -= 8;
          break;

        case TrackElemType.FlatToDown25: // 12
          forward += 1;
          up -= 1;
          break;

        case TrackElemType.Down25ToDown60: // 13
          forward += 1;
          up -= 4;
          break;

        case TrackElemType.Down60ToDown25: // 14
          forward += 1;
          up -= 4;
          break;

        case TrackElemType.Down25ToFlat: // 15
          forward += 1;
          up -= 1;
          break;

        case TrackElemType.LeftQuarterTurn5Tiles: // 16
          forward += 2;
          right -= 3;
          turn -= 1;
          break;

        case TrackElemType.LeftVerticalLoop: // 40
          forward += 2;
          right -= 1;
          break;

        case TrackElemType.RightVerticalLoop: // 41
          forward += 2;
          right += 1;
          break;

        case TrackElemType.LeftQuarterTurn3Tiles: // 42
          forward += 1;
          right -= 1;
          turn -= 1;
          break;

        case TrackElemType.HalfLoopUp: // 56
          up += 19;
          turn += 2;
          break;

        case TrackElemType.HalfLoopDown: // 57
          forward -= 2;
          up -= 19;
          turn += 2;
          isUninverting = true;
          break;

        case TrackElemType.LeftCorkscrewUp:
          forward += 1;
          right -= 2;
          up += 10;
          turn -= 1;
          break;

        case TrackElemType.RightCorkscrewUp: // 59
          forward += 1;
          right += 2;
          up += 10;
          turn += 1;
          break;

        case TrackElemType.RightCorkscrewDown: // 61
          forward += 1;
          right += 2;
          up -= 10;
          turn += 1;
          isUninverting = true;
          break;

        case TrackElemType.RightQuarterTurn1TileUp60: // 96
          right += 1;
          up += 8;
          turn += 1;
          break;

        case TrackElemType.RightQuarterTurn1TileDown60: // 98
          right += 1;
          up -= 8;
          turn += 1;
          break;

        default:
          console.log(`Unsupported track element type: ${trackElemType}`);
          break;
      }

      const pieceBaseHeight = this.z + (isUninverting ? 0 : Math.min(0, up));
      RideBuild.PlaceTrack(this.rideId, new TileCoord(this.x, this.y),
        pieceBaseHeight * 8, this.direction, trackElemType, this.rideType, hasChain, boosterSpeed);

      this.z += up;

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

      this.direction = (this.direction + 4 + turn) % 4;
    };
  }

  BuildStation(length: number): ((data: void) => void)[] {
    const result: ((data: void) => void)[] = [];
    result.push(this.BuildPiece(TrackElemType.EndStation));
    for (let i = 1; i < length - 1; i++) {
      result.push(this.BuildPiece(TrackElemType.MiddleStation));
    }
    if (length >= 2) {
      result.push(this.BuildPiece(TrackElemType.BeginStation));
    }
    return result;
  }

  BuildEntrance = (): ((data: void) => void) => this.BuildEntranceExit(false);
  BuildExit = (): ((data: void) => void) => this.BuildEntranceExit(true);

  private BuildEntranceExit(isExit: boolean): ((data: void) => void) {
    return () => {
      const location = isExit
        ? DirectionUtilities.Travel(this.stationLocation, (this.startDir + 3) % 4, 1)
        : DirectionUtilities.Travel(this.stationLocation, (this.startDir + 1) % 4, 1);
      const direction = (this.startDir + (isExit ? 1 : 3)) % 4;
      return isExit
        ? RideBuild.PlaceExit(this.rideId, location, direction)
        : RideBuild.PlaceEntrance(this.rideId, location, direction);
    };
  }
}
