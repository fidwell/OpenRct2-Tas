import Ride from "../Ride";

export default class LoopingRollerCoaster extends Ride {
  static Identifiers = [
    "rct1.ride.corkscrew_trains",
    "rct2.ride.arrt1",
    "rct2ww.ride.bullet",
    "rct2ww.ride.congaeel",
    "rct2ww.ride.dragon",
    "rct2ww.ride.gratwhte",
    "rct2ww.ride.caddilac",
    "rct2ww.ride.seals",
  ];

  constructor() {
    super(LoopingRollerCoaster.Identifiers);
  }
}
