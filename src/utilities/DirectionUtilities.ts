import TileCoord from "../map/TileCoord";

export default class DirectionUtilities {
  public static Travel(start: TileCoord, direction: number, amount: number) {
    switch (direction) {
      case 0:
        return new TileCoord(start.x - amount, start.y);
      case 1:
        return new TileCoord(start.x, start.y + amount);
      case 2:
        return new TileCoord(start.x + amount, start.y);
      case 3:
        return new TileCoord(start.x, start.y - amount);
    }

    throw new Error(`Invalid direction ${direction}`);
  }
}
