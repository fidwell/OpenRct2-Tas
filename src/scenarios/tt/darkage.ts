export default class TtDarkAge {
    static Run() {
        context.executeAction("ridesetprice", <RideSetPriceArgs>{
           ride: 3,
           price: 100,
           isPrimaryPrice: true
        });
        context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 });
    }
}
