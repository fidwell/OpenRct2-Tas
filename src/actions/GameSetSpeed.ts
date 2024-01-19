export default class GameSetSpeed {
  static Turbo() {
    context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 });
  }
}
