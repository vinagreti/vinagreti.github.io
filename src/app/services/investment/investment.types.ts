export enum INVESTMENT_STATUS {
  RUNNING = "RUNNING",
  DONE = "DONE",
}

export type IInvestment = {
  id: string;
  title: string;
  value: number;
  created: number;
  updated: number;
  startDate: number;
  dueDate: number;
  status: INVESTMENT_STATUS;
  dailyPosition?: IInvestmentDailyPosition[];
};

export type IInvestmentDailyPosition = {
  rentability: number;
  netValue: number;
  IOF: number;
  IR: number;
  grossValue: number;
};
