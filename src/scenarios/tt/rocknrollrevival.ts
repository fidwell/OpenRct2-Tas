import ArrayUtilities from "../../utilities/ArrayUtilities";

export default class TtRockNRollRevival {
  static Actions: ((data: void) => void)[] = [
    // Delete all rides
    ...ArrayUtilities.range(0, 14).map(i => () => context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: i, modifyType: 0 })),
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
