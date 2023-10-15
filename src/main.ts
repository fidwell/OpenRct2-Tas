/// <reference path="../lib/openrct2.d.ts" />

import SixFlagsMagicMountain from "./scenarios/real-parks/SixFlagsMagicMountain";
import DarkAgeRobinHood from "./scenarios/rct2-time-twister/DarkAgeRobinHood";
import RockNRollRevival from "./scenarios/rct2-time-twister/RockNRollRevival";
import RoaringTwentiesSchneiderCup from "./scenarios/rct2-time-twister/RoaringTwentiesSchneiderCup";

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
        actions = new DarkAgeRobinHood().Actions;
        break;
      case "roaring twenties - schneider cup.sc6":
        actions = new RoaringTwentiesSchneiderCup(2).Actions;
        break;
      case "rock 'n' roll - rock 'n' roll.sc6":
        actions = new RockNRollRevival().Actions;
        break;
      case "six flags magic mountain.sc6":
        actions = new SixFlagsMagicMountain().Actions;
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
