export default class TtRockNRollRevival {
  static Run() {
    const start: Date = new Date();
    let isDone: boolean = false;

    let currentAction: number = 0;
    let currentRotoDropId: number = 0;

    // Zoom out once so we can see better
    ui.mainViewport.zoom = 1;

    const actions: ((data: void) => void)[] = [
      // Delete all rides
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 0, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 1, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 2, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 3, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 4, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 5, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 6, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 7, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 8, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 9, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 10, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 11, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 12, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 13, modifyType: 0 }),
      () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 14, modifyType: 0 }),
      // Clear all footpath and scenery
      () => clearScenery(), // Need to do in batches; currently this throws lots of errors since we're doing too much at once
      // Pay off loan
      () => context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 0 }),
      // Build 9 really tall roto-drops in test mode
      ...buildRotoDrop(61, 41, 28),
      ...buildRotoDrop(64, 37, 28),
      ...buildRotoDrop(69, 38, 28),
      ...buildRotoDrop(78, 44, 32),
      ...buildRotoDrop(74, 46, 32),
      ...buildRotoDrop(70, 48, 32),
      ...buildRotoDrop(82, 49, 32),
      ...buildRotoDrop(76, 52, 32),
      ...buildRotoDrop(72, 54, 32),
      // GO FAST
      () => context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 })
    ];

    context.subscribe("interval.tick", () => {
      if (!isDone && scenario.status === "completed") {
        const finish = new Date();
        const ms = finish.getTime() - start.getTime();
        park.postMessage(<ParkMessageDesc>{
          type: "award",
          text: `Objective completed in ${(ms / 1000).toFixed(3)} seconds, ${date.ticksElapsed} ticks`
        });
        isDone = true;
      }

      if (currentAction >= actions.length)
        return;

      actions[currentAction]();
      currentAction += 1;
    });

    function clearScenery() {
      for (let x = 0; x < map.size.x; x += 1) {
        for (let y = 0; y < map.size.y; y += 1) {
          const tile = map.getTile(x, y);
          
          const surfaceElement = <SurfaceElement>tile.elements.filter(e => e.type === "surface")[0];
          if (!surfaceElement.hasOwnership)
            continue;

          clearFootpathAt(tile);
          clearSmallSceneryAt(tile);
          clearLargeSceneryAt(tile);
          clearWallsAt(tile);
        }
      }
    }

    function clearFootpathAt(tile: Tile) {
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

    function clearSmallSceneryAt(tile: Tile) {
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

    function clearLargeSceneryAt(tile: Tile) {
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

    function clearWallsAt(tile: Tile) {
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

    function buildRotoDrop(x: number, y: number, z: number): ((data: void) => void)[] {
      const actions = [];
      let baseHeight: number = z;

      // Look at what we're building, just for fun
      actions.push(() => ui.mainViewport.moveTo(<CoordsXY>{ x: x * 32, y: y * 32 }));

      actions.push(() => context.executeAction("ridecreate", <RideCreateArgs>{
        rideType: 69, // Roto-drop track
        rideObject: 46, // Roto-drop vehicle
        entranceObject: 0, // ?
        colour1: 0,
        colour2: 0
      }, (result: RideCreateActionResult) => {
        currentRotoDropId = result.ride;
      }));
;
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
}
