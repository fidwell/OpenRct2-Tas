/*
Note: This speedrun technique no longer works.
The game recalculates park value before it checks
to see whether you've completed the objective.
*/

export default class SixFlagsMm {
  static Run() {
    console.log("Park value: $" + park.value / 10);

    let currentAction = 0;
    const actions: ((data: void) => void)[] = [
      // Goliath: 2
      () => {
        console.log("Selling Goliath");
        context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 2, modifyType: 0 });
      },
      // Flashback: 26
      () => {
        console.log("Selling Flashback");
        context.executeAction("ridedemolish", <RideDemolishArgs>{ ride: 26, modifyType: 0 });
      },
      // Pay off loan
      () => {
        console.log("Paying loan");
        context.executeAction("parksetloan", <ParkSetLoanArgs>{ value: 0 });
      },
      // Set speed
      () => {
        console.log("Go fast");
        context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 4 });
      }
    ];

    context.subscribe("interval.tick", () => {
      if (currentAction >= actions.length)
      return;

      actions[currentAction]();
      currentAction++;
    });
  }
}
