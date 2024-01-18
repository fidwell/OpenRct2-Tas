import TileCoord from "../map/TileCoord";

export default class MapUtilities {
  static maxHeight(coordinates: TileCoord[]) {
    const heights = coordinates.map(c => {
      const surfaceHere = <SurfaceElement>map.getTile(c.x, c.y).elements.filter(e => e.type === "surface")[0];
      const surfaceHeight = surfaceHere.slope > 0 ? surfaceHere.baseHeight + 2 : surfaceHere.baseHeight;
      return Math.max(surfaceHeight * 8, surfaceHere.waterHeight);
    })
    return Math.max(...heights);
  }
}
