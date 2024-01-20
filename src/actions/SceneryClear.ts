import TileCoord from "../map/TileCoord";

export default class SceneryClear {
  public static AtTile(location: TileCoord): ((_: void) => void)[] {
    const tile = map.getTile(location.x, location.y);

    const surfaceElement = <SurfaceElement>tile.elements.filter(e => e.type === "surface")[0];
    if (!surfaceElement.hasOwnership)
      return [];

    const actions: ((_: void) => void)[] = [];

    (tile.elements.filter(e => e.type === "small_scenery") as SmallSceneryElement[]).forEach(element => {
      const args = <SmallSceneryRemoveArgs>{
        x: tile.x * 32,
        y: tile.y * 32,
        z: element.baseHeight * 8,
        object: element.object,
        quadrant: element.quadrant
      };
      context.queryAction("smallsceneryremove", args, (result: GameActionResult) => {
        if ((result.error === 0) && ((result.cost ?? 0) <= 0)) {
          actions.push(() => context.executeAction("smallsceneryremove", args));
        } else {
          console.log(result.errorMessage);
        }
      });
    });

    return actions;
  }
}
