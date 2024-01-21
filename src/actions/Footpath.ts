import { PathConstructFlags } from "../enums/PathConstructFlags";
import TileCoord from "../map/TileCoord";

export default class Footpath {
  public static PlacePath(location: TileCoord, baseHeight: number) {
    context.executeAction("footpathplace", <FootpathPlaceArgs>{
      x: location.WorldX,
      y: location.WorldY,
      z: baseHeight * 8,
      direction: 0xff, // direction or 0xFF
      object: Footpath.GetPathSurfaceObjectIndex(),
      railingsObject: Footpath.GetPathRailingObjectIndex(),
      slope: 0, // 0: flat, 4,5,6,7: slope direction + 4
      constructFlags: PathConstructFlags.None
    });
  }

  public static PlaceQueue(location: TileCoord, baseHeight: number) {
    context.executeAction("footpathplace", <FootpathPlaceArgs>{
      x: location.WorldX,
      y: location.WorldY,
      z: baseHeight * 8,
      direction: 0xff, // direction or 0xFF
      object: Footpath.GetQueueSurfaceObjectIndex(),
      railingsObject: Footpath.GetPathRailingObjectIndex(),
      slope: 0, // 0: flat, 4,5,6,7: slope direction + 4
      constructFlags: PathConstructFlags.IsQueue
    });
  }

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

  private static GetPathRailingObjectIndex(): number {
    const surfaceObjects = objectManager.getAllObjects("footpath_railings").filter(o => o.identifier.indexOf("queue") === -1);
    return surfaceObjects.length > 0 ? surfaceObjects[0].index : -1;
  }

  private static GetPathSurfaceObjectIndex(): number {
    const surfaceObjects = objectManager.getAllObjects("footpath_surface").filter(o => o.identifier.indexOf("queue") === -1);
    return surfaceObjects.length > 0 ? surfaceObjects[0].index : -1;
  }

  private static GetQueueSurfaceObjectIndex(): number {
    const surfaceObjects = objectManager.getAllObjects("footpath_surface").filter(o => o.identifier.indexOf("queue") >= 0);
    return surfaceObjects.length > 0 ? surfaceObjects[0].index : -1;
  }
}
