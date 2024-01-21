import { EntertainerCostume } from "../enums/EntertainerCostume";
import { StaffOrders } from "../enums/StaffOrders";
import { StaffType } from "../enums/StaffType";

export default class RideBuild {
  public static HireEntertainer(costume: EntertainerCostume) {
    context.executeAction("staffhire", <StaffHireArgs>{
      autoPosition: true,
      staffType: StaffType.Entertainer,
      entertainerType: costume,
      staffOrders: StaffOrders.None
    });
  }

  public static HireHandyman() {
    context.executeAction("staffhire", <StaffHireArgs>{
      autoPosition: true,
      staffType: StaffType.Handyman,
      entertainerType: 0,
      staffOrders: StaffOrders.Handyman
    });
  }

  public static HireMechanic() {
    context.executeAction("staffhire", <StaffHireArgs>{
      autoPosition: true,
      staffType: StaffType.Mechanic,
      entertainerType: 0,
      staffOrders: StaffOrders.Mechanic
    });
  }
}
