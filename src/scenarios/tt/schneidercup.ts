import AirPoweredVerticalCoaster from "../../rides/AirPoweredVerticalCoaster";
import LoopingRollerCoaster from "../../rides/LoopingRollerCoaster";

export default class SchneiderCup {
  constructor(private method: number) {}

  private method1: ((data: void) => void)[] = [
    // Go fast
    () => context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 }),
    // Take out $5,000 loan
    () => context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 50000 }),
    // Build and open some shuttle loops
    ...new LoopingRollerCoaster().BuildShuttleLoop(4, 88, 60, 2),
    ...new LoopingRollerCoaster().BuildShuttleLoop(6, 77, 60, 2),
    ...new LoopingRollerCoaster().BuildShuttleLoop(4, 73, 60, 2),
    ...new LoopingRollerCoaster().BuildShuttleLoop(7, 68, 60, 2),
    ...new LoopingRollerCoaster().BuildShuttleLoop(7, 64, 60, 2),
    ...new LoopingRollerCoaster().BuildShuttleLoop(8, 60, 60, 2),
    ...new LoopingRollerCoaster().BuildShuttleLoop(9, 56, 60, 2),
    ...new LoopingRollerCoaster().BuildShuttleLoop(12, 52, 60, 2)
  ];

  private method2: ((data: void) => void)[] = [
    // Go fast
    () => context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 }),
    // Build and open some APVs
    ...new AirPoweredVerticalCoaster().BuildTinyLoop(6, 88, 60, 3),
    ...new AirPoweredVerticalCoaster().BuildTinyLoop(9, 71, 60, 3),
    ...new AirPoweredVerticalCoaster().BuildTinyLoop(14, 82, 60, 3),
    ...new AirPoweredVerticalCoaster().BuildTinyLoop(17, 71, 60, 3)
  ];

  Actions: ((data: void) => void)[] = this.method === 1 ? this.method1 : this.method2;
}
