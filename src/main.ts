/// <reference path="../lib/openrct2.d.ts" />

import SixFlagsMm from "./scenarios/real/sixflagsmm";
import TtDarkAge from "./scenarios/tt/darkage";
import TtRockNRollRevival from "./scenarios/tt/rocknrollrevival";

const main = (): void => {
  context.subscribe("map.changed", () => {
    switch (scenario.filename.toLocaleLowerCase()) {
      case "dark age - robin hood.sc6":
        TtDarkAge.Run();
        break;
      case "six flags magic mountain.sc6":
        SixFlagsMm.Run();
        break;
      case "rock 'n' roll - rock 'n' roll.sc6":
        TtRockNRollRevival.Run();
        break;
      default:
        console.log("Scenario not supported: " + scenario.filename);
        break;
    }
  });
};

export default main;
