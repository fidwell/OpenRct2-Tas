import { RideType } from "../../enums/RideType";
import Shop from "./Shop";

export default class BurgerBar extends Shop {
  static Identifiers: string[] = [ "rct2.ride.burgb" ];

  constructor() {
    super(RideType.Shop, BurgerBar.Identifiers);
  }
}
