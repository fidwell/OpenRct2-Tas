import TileCoord from "../map/TileCoord";

export default class Scenery {
  public static RemoveLarge(location: TileCoord): ((_: void) => void)[] {
    const tile = map.getTile(location.x, location.y);

    const surfaceElement = <SurfaceElement>tile.elements.filter(e => e.type === "surface")[0];
    if (!surfaceElement.hasOwnership)
      return [];

    const actions: ((_: void) => void)[] = [];

    (tile.elements.filter(e => e.type === "large_scenery") as LargeSceneryElement[])
      .filter(e => e.sequence === 0)
      .forEach(element => {
        const args = <LargeSceneryRemoveArgs>{
          x: tile.x * 32,
          y: tile.y * 32,
          z: element.baseHeight * 8,
          object: element.object,
          direction: element.direction,
          tileIndex: element.sequence
        };
        context.queryAction("largesceneryremove", args, (result: GameActionResult) => {
          if (result.error === 0) {
            if (result.cost ?? 0 <= 0) {
              actions.push(() => context.executeAction("largesceneryremove", args));
            }
          } else {
            console.log(`Couldn't remove large scenery: ${result.errorMessage}`);
          }
        });
      });

    return actions;
  }

  public static RemoveSmall(location: TileCoord): ((_: void) => void)[] {
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
        if (result.error === 0) {
          if (result.cost ?? 0 <= 0) {
            actions.push(() => context.executeAction("smallsceneryremove", args));
          }
        } else {
          console.log(`Couldn't remove small scenery: ${result.errorMessage}`);
        }
      });
    });

    return actions;
  }

  public static RemoveWall(location: TileCoord): ((_: void) => void)[] {
    const tile = map.getTile(location.x, location.y);

    const surfaceElement = <SurfaceElement>tile.elements.filter(e => e.type === "surface")[0];
    if (!surfaceElement.hasOwnership)
      return [];

    const actions: ((_: void) => void)[] = [];

    (tile.elements.filter(e => e.type === "wall") as WallElement[]).forEach(element => {
      const args = <WallRemoveArgs>{
        x: tile.x * 32,
        y: tile.y * 32,
        z: element.baseHeight * 8,
        direction: element.direction
      };
      context.queryAction("wallremove", args, (result: GameActionResult) => {
        if (result.error === 0) {
          if ((result.cost ?? 0) < 0) {
            actions.push(() => context.executeAction("wallremove", args));
          }
        } else {
          console.log(`Couldn't remove wall: ${result.errorMessage}`);
        }
      });
    });

    return actions;
  }
}
