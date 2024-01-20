import { RideMode } from "../enums/RideMode";
import { RideSetSetting as RideSetSetting } from "../enums/RideSetSetting";
import { RideStatus } from "../enums/RideStatus";

export default class RideModify {
  public static Demolish(rideId: number) {
    context.executeAction("ridedemolish", <RideDemolishArgs>{
      ride: rideId,
      modifyType: 0
    });
  }

  public static LaunchSpeed(rideId: number, speed: number) {
    // Todo: Add mapping from km/h or mph to game values
    context.executeAction("ridesetsetting", <RideSetSettingArgs>{
      ride: rideId,
      setting: RideSetSetting.Operation,
      value: speed
    });
  }

  public static Mode(rideId: number, mode: RideMode) {
    context.executeAction("ridesetsetting", <RideSetSettingArgs>{
      ride: rideId,
      setting: RideSetSetting.Mode,
      value: mode
    });
  }

  public static Price(rideId: number, price: number) {
    context.executeAction("ridesetprice", <RideSetPriceArgs>{
      ride: rideId,
      price,
      isPrimaryPrice: true
    });
  }

  public static Status(rideId: number, status: RideStatus) {
    context.executeAction("ridesetstatus", <RideSetStatusArgs>{
      ride: rideId,
      status: status
    });
  }
}