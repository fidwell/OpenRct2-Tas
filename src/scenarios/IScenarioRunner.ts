import TileCoord from "../map/TileCoord";

export default interface IScenarioRunner {
  CameraLocation: TileCoord;
  OnTick: () => void;
}
