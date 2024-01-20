import ScenarioRunner from "./ScenarioRunner";
import HydroHills from "./rct1-corkscrew-follies/HydroHills";
import MineralPark from "./rct1-corkscrew-follies/MineralPark";
import AfterTheAsteroid from "./rct2-time-twister/AfterTheAsteroid";
import AnimatronicFilmSet from "./rct2-time-twister/AnimatronicFilmSet";
import CradleOfCivilization from "./rct2-time-twister/CradleOfCivilization";
import DarkAgeRobinHood from "./rct2-time-twister/DarkAgeRobinHood";
import FutureWorld from "./rct2-time-twister/FutureWorld";
import RoaringTwentiesSchneiderCup from "./rct2-time-twister/RoaringTwentiesSchneiderCup";
import RockNRollRevival from "./rct2-time-twister/RockNRollRevival";
import Renovation from "./rct2-wacky-worlds/Renovation";
import RioCarnival from "./rct2-wacky-worlds/RioCarnival";
import SixFlagsMm from "./real-parks/SixFlagsMagicMountain";

export default class RunnerFactory {
  private static Runners: { [key: string]: ((_: void) => ScenarioRunner) } = {
    // Corkscrew Follies
    "SC50.SC4": () => new HydroHills(),
    "SC66.SC4": () => new MineralPark(),
    // Wacky Worlds
    "South America - Rio Carnival.SC6": () => new RioCarnival(),
    "Europe - Renovation.SC6": () => new Renovation(),
    // Time Twister
    "Dark Age - Robin Hood.SC6": () => new DarkAgeRobinHood(),
    "Prehistoric - After the Asteroid.SC6": () => new AfterTheAsteroid(),
    "Mythological - Animatronic Film Set.SC6": () => new AnimatronicFilmSet(),
    "Roaring Twenties - Schneider Cup.SC6": () => new RoaringTwentiesSchneiderCup(2),
    "Future - Future World.SC6": () => new FutureWorld(),
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
