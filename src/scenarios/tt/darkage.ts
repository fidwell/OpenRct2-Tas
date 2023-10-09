export default class TtDarkAge {
    static Actions = (): ((data: void) => void)[] => [
        () => context.executeAction("ridesetprice", <RideSetPriceArgs>{
           ride: 3,
           price: 100,
           isPrimaryPrice: true
        }),
        () => context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 })
    ];
}
