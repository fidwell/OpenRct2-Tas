import { RideType } from "../../enums/RideType";
import Shop from "./Shop";

export default class Toilets extends Shop {
  static Identifiers: string[] = [
    "rct1.ride.toilets",
    "rct2.ride.tlt1",
    "rct2.ride.tlt2"
  ];

  constructor() {
    super(RideType.Toilets, Toilets.Identifiers);
  }
}
