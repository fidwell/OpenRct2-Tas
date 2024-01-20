import ScenarioRunner from "./ScenarioRunner";
import HydroHills from "./rct1-corkscrew-follies/HydroHills";
import MineralPark from "./rct1-corkscrew-follies/MineralPark";
import CradleOfCivilization from "./rct2-time-twister/CradleOfCivilization";
import DarkAgeRobinHood from "./rct2-time-twister/DarkAgeRobinHood";
import RoaringTwentiesSchneiderCup from "./rct2-time-twister/RoaringTwentiesSchneiderCup";
import RockNRollRevival from "./rct2-time-twister/RockNRollRevival";
import SixFlagsMm from "./real-parks/SixFlagsMagicMountain";

export default class RunnerFactory {
  private static Runners: { [key: string]: ((_: void) => ScenarioRunner) } = {
    "SC50.SC4": () => new HydroHills(),
    "SC66.SC4": () => new MineralPark(),
    "Dark Age - Robin Hood.SC6": () => new DarkAgeRobinHood(),
    "Roaring Twenties - Schneider Cup.SC6": () => new RoaringTwentiesSchneiderCup(2),
    "Mythological - Cradle of Civilization.SC6": () => new CradleOfCivilization(),
    "Rock 'n' Roll - Rock 'n' Roll.SC6": () => new RockNRollRevival(),
    "Six Flags Magic Mountain.SC6": () => new SixFlagsMm()
  };

  public static GetByFileName(fileName: string): ScenarioRunner | null {
    const runnerConstructor = RunnerFactory.Runners[fileName];
    return runnerConstructor !== undefined && runnerConstructor !== null
      ? runnerConstructor()
      : null;
  }
}
