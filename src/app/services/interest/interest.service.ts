import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class InterestService {
  constructor() {}

  interestByInitialFinalAndTimes = (
    initial: number,
    final: number,
    times: number,
  ) => {
    const interestRate = Math.pow(final! / initial!, 1 / times!) - 1;
    return interestRate;
  };
}
