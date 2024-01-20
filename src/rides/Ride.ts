import RideUtilities from "../utilities/RideUtilities";

export default class Ride {
  protected VehicleId: number = -1;

  constructor(public VehicleIdentifiers: string[]) { 
    this.VehicleId = RideUtilities.GetRideObjectIndex(VehicleIdentifiers);
  }
}
