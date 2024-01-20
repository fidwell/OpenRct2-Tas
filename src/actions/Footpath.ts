import TileCoord from "../map/TileCoord";

export default class Footpath {
  public static Remove(location: TileCoord): ((_: void) => void)[] {
    const tile = map.getTile(location.x, location.y);
    
    const surfaceElement = <SurfaceElement>tile.elements.filter(e => e.type === "surface")[0];
    if (!surfaceElement.hasOwnership)
      return [];
    
    const actions: ((_: void) => void)[] = [];

    (tile.elements.filter(e => e.type === "footpath") as FootpathElement[]).forEach(element => {
      const args = <FootpathRemoveArgs>{
        x: tile.x * 32,
        y: tile.y * 32,
        z: element.baseHeight * 8,
        object: element.object
      };
      context.queryAction("footpathremove", args, (result: GameActionResult) => {
        if (result.error === 0) {
          actions.push(() => context.executeAction("footpathremove", args));
        } else {
          console.log(result.errorMessage);
        }
      });
    });

    return actions;
  }
}
