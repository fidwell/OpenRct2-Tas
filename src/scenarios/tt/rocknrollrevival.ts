import ArrayUtilities from "../../utilities/ArrayUtilities";

export default class TtRockNRollRevival {
  static Actions: ((data: void) => void)[] = [
    // Delete all rides
    ...ArrayUtilities.range(0, 14).map(i => () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: i, modifyType: 0 })),
    // Clear all footpath and scenery
    // Need to do in batches; currently this throws lots of errors since we're doing too much at once
    () => TtRockNRollRevival.ClearScenery(),
    // Pay off loan
    () => context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 0 }),
    // Build 9 really tall roto-drops in test mode
    ...TtRockNRollRevival.BuildRotoDrop(61, 41, 28),
    ...TtRockNRollRevival.BuildRotoDrop(64, 37, 28),
    ...TtRockNRollRevival.BuildRotoDrop(69, 38, 28),
    ...TtRockNRollRevival.BuildRotoDrop(78, 44, 32),
    ...TtRockNRollRevival.BuildRotoDrop(74, 46, 32),
    ...TtRockNRollRevival.BuildRotoDrop(70, 48, 32),
    ...TtRockNRollRevival.BuildRotoDrop(82, 49, 32),
    ...TtRockNRollRevival.BuildRotoDrop(76, 52, 32),
    ...TtRockNRollRevival.BuildRotoDrop(72, 54, 32),
    // GO FAST
    () => context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 })
  ];

  static ClearScenery() {
    for (let x = 0; x < map.size.x; x += 1) {
      for (let y = 0; y < map.size.y; y += 1) {
        const tile = map.getTile(x, y);

        const surfaceElement = <SurfaceElement>tile.elements.filter(e => e.type === "surface")[0];
        if (!surfaceElement.hasOwnership)
          continue;

        TtRockNRollRevival.ClearFootpathAt(tile);
        TtRockNRollRevival.ClearSmallSceneryAt(tile);
        TtRockNRollRevival.ClearLargeSceneryAt(tile);
        TtRockNRollRevival.ClearWallsAt(tile);
      }
    }
  }

  static ClearFootpathAt(tile: Tile) {
    const footpathCoords = [];
    for (let e = 0; e < tile.elements.length; e += 1) {
      const element = tile.elements[e];
      if (element.type === "footpath") {
        footpathCoords.push({ x: tile.x * 32, y: tile.y * 32, z: element.baseHeight * 8 });
      }
    }

    for (let i = 0; i < footpathCoords.length; i += 1) {
      context.executeAction("footpathremove", <FootpathRemoveArgs>{
        x: footpathCoords[i].x,
        y: footpathCoords[i].y,
        z: footpathCoords[i].z
      });
    }
  }

  static ClearSmallSceneryAt(tile: Tile) {
    tile.elements.filter(t => t.type === "small_scenery").forEach((element: SmallSceneryElement) => {
      const args = <SmallSceneryRemoveArgs>{
        x: tile.x * 32,
        y: tile.y * 32,
        z: element.baseHeight * 8,
        object: element.object,
        quadrant: element.quadrant
      };
      context.queryAction("smallsceneryremove", args, (result: GameActionResult) => {
        if (result.cost <= 0) {
          context.executeAction("smallsceneryremove", args);
        }
      });
    });
  }

  static ClearLargeSceneryAt(tile: Tile) {
    tile.elements.filter(t => t.type === "large_scenery").forEach((element: LargeSceneryElement) => {
      const args = <LargeSceneryRemoveArgs>{
        x: tile.x * 32,
        y: tile.y * 32,
        z: element.baseHeight * 8,
        direction: element.direction,
        tileIndex: tile.x + tile.y * map.size.x // probably
      };
      context.queryAction("largesceneryremove", args, (result: GameActionResult) => {
        if (result.cost <= 0) {
          context.executeAction("largesceneryremove", args);
        }
      });
    });
  }

  static ClearWallsAt(tile: Tile) {
    tile.elements.filter(t => t.type === "wall").forEach((element: WallElement) => {
      const args = <WallRemoveArgs>{
        x: tile.x * 32,
        y: tile.y * 32,
        z: element.baseHeight * 8,
        direction: element.direction
      };
      context.queryAction("wallremove", args, (result: GameActionResult) => {
        if (result.cost <= 0) {
          context.executeAction("wallremove", args);
        }
      });
    });
  }

  static BuildRotoDrop(x: number, y: number, z: number): ((data: void) => void)[] {
    const actions = [];
    let baseHeight: number = z;
    let currentRotoDropId: number = 0;

    actions.push(() => context.executeAction("ridecreate", <RideCreateArgs>{
      rideType: 69, // Roto-drop track
      rideObject: 46, // Roto-drop vehicle
      entranceObject: 0, // ?
      colour1: 0,
      colour2: 0
    }, (result: RideCreateActionResult) => {
      currentRotoDropId = result.ride;
    }));
    
    actions.push(() => context.executeAction("trackplace", <TrackPlaceArgs>{
      x: x * 32,
      y: y * 32,
      z: baseHeight * 8,
      direction: 0,
      ride: currentRotoDropId,
      trackType: 66, // tower base
      rideType: 69,
      brakeSpeed: 0,
      colour: 0,
      seatRotation: 0,
      trackPlaceFlags: 0,
      isFromTrackDesign: false
    }));

    for (let i = 0; i < 35; i += 1) {
      actions.push(() => context.executeAction("trackplace", <TrackPlaceArgs>{
        x: x * 32,
        y: y * 32,
        z: (baseHeight + 12 + i * 4) * 8,
        direction: 0,
        ride: currentRotoDropId,
        trackType: 67, // tower vertical
        rideType: 69,
        brakeSpeed: 0,
        colour: 0,
        seatRotation: 0,
        trackPlaceFlags: 0,
        isFromTrackDesign: false
      }));
    }

    actions.push(() => context.executeAction("rideentranceexitplace", <RideEntranceExitPlaceArgs>{
      x: (x - 2) * 32,
      y: y * 32,
      direction: 2,
      ride: currentRotoDropId,
      station: 0,
      isExit: false
    }));

    actions.push(() => context.executeAction("rideentranceexitplace", <RideEntranceExitPlaceArgs>{
      x: (x + 2) * 32,
      y: y * 32,
      direction: 0,
      ride: currentRotoDropId,
      station: 0,
      isExit: true
    }));

    actions.push(() => context.executeAction("ridesetstatus", <RideSetStatusArgs>{
      ride: currentRotoDropId,
      status: 2 // testing
    }));

    return actions;
  }
}
