import RunnerFactory from "./scenarios/RunnerFactory";
import ScenarioRunner from "./scenarios/ScenarioRunner";

const main = (): void => {
  let runner: ScenarioRunner | null;
  let scenarioCompleted: boolean;
  let startDate: Date;
  let startTicks: number;

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
      runner = null;
      return;
    }

    runner.OnTick();
  });
};

export default main;
