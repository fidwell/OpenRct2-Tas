// This is a bitmask, so | all your desired priorities together.
export enum ResearchPriorities {
  None = 0b0,
  Transport = 0b1,
  Gentle = 0b10,
  Rollercoaster = 0b100,
  Thrill = 0b1000,
  Water = 0b10000,
  Shop = 0b100000,
  SceneryGroup = 0b1000000,

  AllRides = Transport | Gentle | Rollercoaster | Thrill | Water,
  AllNonScenery = Transport | Gentle | Rollercoaster | Thrill | Water | Shop,
  All = Transport | Gentle | Rollercoaster | Thrill | Water | Shop | SceneryGroup
}
