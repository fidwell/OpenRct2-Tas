export default class GameSetSpeed {
  public static Turbo() {
    context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 });
  }
}
