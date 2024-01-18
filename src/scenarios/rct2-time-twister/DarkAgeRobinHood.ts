import ScenarioRunner from "../ScenarioRunner";

export default class DarkAgeRobinHood extends ScenarioRunner {
    constructor() {
        super([
            () => context.executeAction("ridesetprice", <RideSetPriceArgs>{
               ride: 3,
               price: 100,
               isPrimaryPrice: true
            }),
            () => context.executeAction("gamesetspeed", <GameSetSpeedArgs>{ speed: 8 })
        ]);
    }
}
