import { RideType } from "../../enums/RideType";
import Shop from "./Shop";

export default class DrinksStall extends Shop {
  static Identifiers: string[] = [ "rct2.ride.drnks" ];

  constructor() {
    super(RideType.Shop, DrinksStall.Identifiers);
  }
}
