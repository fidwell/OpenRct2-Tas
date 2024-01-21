import { MarketingType } from "../enums/MarketingType";
import { ResearchFunding } from "../enums/ResarchFunding";
import { ResearchPriorities } from "../enums/ResearchPriorities";

export default class ParkModify {
  public static SetMarketing(type: MarketingType, duration: number, item: number = 0) {
    context.executeAction("parkmarketing", <ParkMarketingArgs>{ type, duration, item });
  }

  public static SetResearch(fundingAmount: ResearchFunding, priorities: ResearchPriorities) {
    context.executeAction("parksetresearchfunding", <ParkSetResearchFundingArgs>{
      fundingAmount,
      priorities
    });
  }

  public static SetLoan(value: number) {
    context.executeAction("parksetloan", <ParkSetLoanArgs>{ value });
  }
}
