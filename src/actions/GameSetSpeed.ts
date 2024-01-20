import { GameSpeed } from "../enums/GameSpeed";

export default class GameModify {
  public static SetSpeed(speed: GameSpeed) {
    context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed });
  }
}
