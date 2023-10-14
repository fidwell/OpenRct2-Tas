import LoopingRollerCoaster from "../../rides/LoopingRollerCoaster";

export default class SchneiderCup {
  Actions: ((data: void) => void)[] = [
    // Go fast
    // () => context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 }),
    // Take out $5,000 loan
    () => context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 50000 }),
    // Build and open (test?) 11 shuttle loops
    ...new LoopingRollerCoaster().BuildShuttleLoop(4, 73, 60, 2),
    ...new LoopingRollerCoaster().BuildShuttleLoop(7, 68, 60, 2),
    ...new LoopingRollerCoaster().BuildShuttleLoop(7, 64, 60, 2),
  ];
}
