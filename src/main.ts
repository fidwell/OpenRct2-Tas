/// <reference path="../lib/openrct2.d.ts" />

import SixFlagsMm from "./scenarios/real/sixflagsmm";
import TtDarkAge from "./scenarios/tt/darkage";
import TtRockNRollRevival from "./scenarios/tt/rocknrollrevival";
import SchneiderCup from "./scenarios/tt/schneidercup";

const main = (): void => {
  let actions: ((data: void) => void)[] = [];
  let currentAction: number = 0;
  let scenarioCompleted: boolean;
  let startDate: Date;
  let startTicks: number;

  context.subscribe("map.changed", () => {
    actions = [];

    if (context.mode !== "normal")
      return;

    switch (scenario.filename.toLocaleLowerCase()) {
      case "dark age - robin hood.sc6":
        actions = new TtDarkAge().Actions;
        break;
      case "roaring twenties - schneider cup.sc6":
        actions = new SchneiderCup().Actions;
        break;
      case "rock 'n' roll - rock 'n' roll.sc6":
        actions = new TtRockNRollRevival().Actions;
        break;
      case "six flags magic mountain.sc6":
        actions = new SixFlagsMm().Actions;
        break;
      default:
        console.log("Scenario not supported: " + scenario.filename);
        break;
    }
    
    currentAction = 0;
    scenarioCompleted = false;
    startDate = new Date();
    startTicks = date.ticksElapsed;
  });

  context.subscribe("interval.tick", () => {
    if (context.mode !== "normal")
      return;

    if (!scenarioCompleted && scenario.status === "completed") {
      const finish = new Date();
      const ms = finish.getTime() - startDate.getTime();
      const totalTicks = date.ticksElapsed - startTicks;
      park.postMessage(<ParkMessageDesc>{
        type: "award",
        text: `Objective completed in ${(ms / 1000).toFixed(3)} seconds, ${totalTicks} ticks`
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
