import ScenarioRunner from "./scenarios/ScenarioRunner";
import HydroHills from "./scenarios/rct1-corkscrew-follies/HydroHills";
import MineralPark from "./scenarios/rct1-corkscrew-follies/MineralPark";
import DarkAgeRobinHood from "./scenarios/rct2-time-twister/DarkAgeRobinHood";
import RoaringTwentiesSchneiderCup from "./scenarios/rct2-time-twister/RoaringTwentiesSchneiderCup";
import RockNRollRevival from "./scenarios/rct2-time-twister/RockNRollRevival";
import SixFlagsMagicMountain from "./scenarios/real-parks/SixFlagsMagicMountain";

const main = (): void => {
  let runner: ScenarioRunner;
  let currentAction: number = 0;
  let scenarioCompleted: boolean;
  let startDate: Date;
  let startTicks: number;

  context.subscribe("map.changed", () => {
    if (context.mode !== "normal")
      return;

    switch (scenario.filename.toLocaleLowerCase()) {
      case "sc50.sc4":
        runner = new HydroHills();
        break;
      case "sc66.sc4":
        runner = new MineralPark();
        break;
      case "dark age - robin hood.sc6":
        runner = new DarkAgeRobinHood();
        break;
      case "roaring twenties - schneider cup.sc6":
        runner = new RoaringTwentiesSchneiderCup(2);
        break;
      case "rock 'n' roll - rock 'n' roll.sc6":
        runner = new RockNRollRevival();
        break;
      case "six flags magic mountain.sc6":
        runner = new SixFlagsMagicMountain();
        break;
      default:
        console.log("Scenario not supported: " + scenario.filename);
        break;
    }
    
    currentAction = 0;
    scenarioCompleted = false;
    startDate = new Date();
    startTicks = date.ticksElapsed;
    ui.closeAllWindows();
  });

  context.subscribe("interval.tick", () => {
    if (context.mode !== "normal")
      return;

    if (runner === undefined || runner === null)
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
      runner = new ScenarioRunner([]);
    }

    if (currentAction >= runner.Actions.length)
      return;

    runner.Actions[currentAction]();
    
    if (!runner.IsWaiting) {
      currentAction += 1;
    }
  });
};

export default main;
