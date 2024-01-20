import { ResearchFunding } from "../enums/ResarchFunding";
import { ResearchPriorities } from "../enums/ResearchPriorities";

export default class ParkModify {
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
