import GameModify from "../../actions/GameSetSpeed";
import ParkModify from "../../actions/ParkModify";
import RideModify from "../../actions/RideModify";
import Staff from "../../actions/Staff";
import { GameSpeed } from "../../enums/GameSpeed";
import { MarketingType } from "../../enums/MarketingType";
import { ShopItem } from "../../enums/ShopItem";
import TileCoord from "../../map/TileCoord";
import CorkscrewRollerCoaster from "../../rides/rollerCoasters/CorkscrewRollerCoaster";
import BurgerBar from "../../rides/shops/BurgerBar";
import DrinksStall from "../../rides/shops/DrinksStall";
import Toilets from "../../rides/shops/Toilets";
import ActionUtilities from "../../utilities/ActionUtilities";
import ScenarioRunner from "../ScenarioRunner";

export default class FruitFarm extends ScenarioRunner {
  constructor() {
    super(new TileCoord(59, 55), [
      () => GameModify.SetSpeed(GameSpeed.Hyper),
      () => RideModify.Demolish(0),
      ...new CorkscrewRollerCoaster().BuildTinyCork(63, 51, 0, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(63, 54, 0, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(63, 57, 0, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(63, 60, 0, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(68, 58, 2, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(68, 61, 2, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(68, 64, 2, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(64, 39, 1, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(64, 39, 1, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(68, 39, 1, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(44, 51, 1, 12),
      ...new CorkscrewRollerCoaster().BuildTinyCork(47, 51, 1, 12),
      ...ActionUtilities.Repeat(() => Staff.HireHandyman(), 10),
      ...ActionUtilities.Repeat(() => Staff.HireMechanic(), 10),
      ...new Toilets().Build(new TileCoord(63, 62), 2),
      ...new DrinksStall().Build(new TileCoord(65, 62), 0),
      ...new BurgerBar().Build(new TileCoord(65, 60), 0),
      () => ParkModify.SetLoan(150000),
      () => ParkModify.SetMarketing(MarketingType.Park, 12),
      () => ParkModify.SetMarketing(MarketingType.Ride, 12, 1),
      () => ParkModify.SetMarketing(MarketingType.FreeFoodOrDrink, 12, ShopItem.Drink)
    ]);
  }

  public override OnTick(): void {
    if (date.month % 3 === 0 && date.monthProgress === 0) {
      this.Actions.enqueue(() => ParkModify.SetMarketing(MarketingType.Park, 12));
      this.Actions.enqueue(() => ParkModify.SetMarketing(MarketingType.Ride, 12, 1));
      this.Actions.enqueue(() => ParkModify.SetMarketing(MarketingType.FreeFoodOrDrink, 12, ShopItem.Drink));
    }

    super.OnTick();
  }
}
