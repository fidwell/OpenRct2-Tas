export default class TileCoord {
  constructor(public x: number, public y: number) { }

  public WorldX: number = this.x * 32;
  public WorldY: number = this.y * 32;

  public NeighborsEight(): TileCoord[] {
    return [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 0], [0, 1],
      [1, -1], [1, 0], [1, 1],
    ].map(c => new TileCoord(c[0] + this.x, c[1] + this.y));
  }
}
