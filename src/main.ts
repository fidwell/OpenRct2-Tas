/// <reference path="../lib/openrct2.d.ts" />

import SixFlagsMm from "./scenarios/real/sixflagsmm";
import TtDarkAge from "./scenarios/tt/darkage";
import TtRockNRollRevival from "./scenarios/tt/rocknrollrevival";

const main = (): void => {
  let actions: ((data: void) => void)[] = [];
  let currentAction: number = 0;
  let scenarioCompleted: boolean;
  let start: Date;

  context.subscribe("map.changed", () => {
    actions = [];

    if (context.mode !== "normal")
      return;

    switch (scenario.filename.toLocaleLowerCase()) {
      case "dark age - robin hood.sc6":
        actions = TtDarkAge.Actions;
        break;
      case "six flags magic mountain.sc6":
        actions = SixFlagsMm.Actions;
        break;
      case "rock 'n' roll - rock 'n' roll.sc6":
        actions = TtRockNRollRevival.Actions;
        break;
      default:
        console.log("Scenario not supported: " + scenario.filename);
        break;
    }
    
    currentAction = 0;
    scenarioCompleted = false;
    start = new Date();
  });

  context.subscribe("interval.tick", () => {
    if (context.mode !== "normal")
      return;

    if (!scenarioCompleted && scenario.status === "completed") {
      const finish = new Date();
      const ms = finish.getTime() - start.getTime();
      park.postMessage(<ParkMessageDesc>{
        type: "award",
        text: `Objective completed in ${(ms / 1000).toFixed(3)} seconds, ${date.ticksElapsed} ticks`
      });
      scenarioCompleted = true;
    }

    if (currentAction >= actions.length)
      return;

    actions[currentAction]();
    currentAction += 1;
  });
};

export default main;
