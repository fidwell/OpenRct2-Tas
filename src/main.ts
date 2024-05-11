import IScenarioRunner from "./scenarios/IScenarioRunner";
import RunnerFactory from "./scenarios/RunnerFactory";

let tickSubscription: IDisposable;
let runner: IScenarioRunner | null;
let scenarioCompleted: boolean;
let startDate: Date;
let startTicks: number;

const main = (): void => {
  context.subscribe("map.changed", () => {
    if (context.mode !== "normal")
      return;

    runner = RunnerFactory.GetByFileName(scenario.filename);
    if (runner === null) {
      console.log(`Scenario not supported: ${scenario.filename}`);
      return;
    }

    scenarioCompleted = false;
    startDate = new Date();
    startTicks = date.ticksElapsed;
    ui.closeAllWindows();
    ui.mainViewport.zoom = 1;
    ui.mainViewport.moveTo(<CoordsXY>{ x: runner.CameraLocation.WorldX, y: runner.CameraLocation.WorldY });
    startTas();
  });
};

const startTas = (): void => {
  tickSubscription = context.subscribe("interval.tick", () => {
    if (context.mode !== "normal") {
      tickSubscription.dispose();
      return;
    }

    if (runner === undefined || runner === null) {
      tickSubscription.dispose();
      return;
    }

    if (!scenarioCompleted && scenario.status === "completed") {
      const finish = new Date();
      const ms = finish.getTime() - startDate.getTime();
      const totalTicks = date.ticksElapsed - startTicks;
      park.postMessage(<ParkMessageDesc>{
        type: "award",
        text: `Objective completed in ${(ms / 1000).toFixed(3)} seconds, ${totalTicks} ticks`
      });
      scenarioCompleted = true;
      runner = null;
      tickSubscription.dispose();
      return;
    }

    runner.OnTick();
  });
};

export default main;
