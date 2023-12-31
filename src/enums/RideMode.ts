// See Ride.h
export enum RideMode {
  Normal,
  ContinuousCircuit,
  ReverseInclineLaunchedShuttle,
  PoweredLaunchPasstrough, // RCT2 style, pass through station
  Shuttle,
  BoatHire,
  UpwardLaunch,
  RotatingLift,
  StationToStation,
  SingleRidePerAdmission,
  UnlimitedRidesPerAdmission = 10,
  Maze,
  Race,
  Dodgems,
  Swing,
  ShopStall,
  Rotation,
  ForwardRotation,
  BackwardRotation,
  FilmAvengingAviators,
  MouseTails3DFilm = 20,
  SpaceRings,
  Beginners,
  LimPoweredLaunch,
  FilmThrillRiders,
  StormChasers3DFilm,
  SpaceRaiders3DFilm,
  Intense,
  Berserk,
  HauntedHouse,
  Circus = 30,
  DownwardLaunch,
  CrookedHouse,
  FreefallDrop,
  ContinuousCircuitBlockSectioned,
  PoweredLaunch, // RCT1 style, don't pass through station
  PoweredLaunchBlockSectioned,

  Count,
  NullMode = 255
}
