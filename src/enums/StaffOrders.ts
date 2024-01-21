// This is a bitmask, so | all your desired priorities together.
export enum StaffOrders {
  None = 0b0,

  Sweeping = 0b1,
  WaterFlowers = 0b10,
  EmptyBins = 0b100,
  Mowing = 0b1000,

  InspectRides = 0b1,
  FixRides = 0b10,

  Handyman = Sweeping | WaterFlowers | EmptyBins,
  Mechanic = InspectRides | FixRides
}
