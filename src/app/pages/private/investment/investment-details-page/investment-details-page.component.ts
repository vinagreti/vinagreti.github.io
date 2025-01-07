import { InterestService } from "@services/interest/interest.service";
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgFor,
  NgIf,
  PercentPipe,
} from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { ActivatedRoute, RouterLink, RouterModule } from "@angular/router";
import { ChartComponent } from "@components/chart/chart.component";
import { InvestmentService } from "@services/investment/investment.service";
import {
  IInvestment,
  IInvestmentDailyPosition,
} from "@services/investment/investment.types";
import { firstValueFrom, map } from "rxjs";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";
import { PageWrapperActionsComponent } from "@components/ui/page-wrapper/page-wrapper-actions/page-wrapper-actions.component";

@Component({
  selector: "app-investment-details-page",
  imports: [
    NgIf,
    RouterModule,
    RouterLink,
    NgFor,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    ChartComponent,
    PageWrapperComponent,
    PageWrapperActionsComponent,
  ],
  templateUrl: "./investment-details-page.component.html",
  styleUrl: "./investment-details-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestmentDetailsPageComponent {
  investmentService = inject(InvestmentService);

  investment = signal<IInvestment | null>(null);

  route = inject(ActivatedRoute);

  interestService = inject(InterestService);

  investmentId$ = this.route.params.pipe(
    map((params) => params["investmentId"]),
  );

  todayDateTime = Date.now();

  chartData = computed(() => {
    const newChartData = this.generateChartDataBasedOnInvestmentDailyPosition();
    return newChartData;
  });

  averages = computed(() => {
    const investment = this.investment();
    if (investment) {
      return this.calcInterestAverage(investment);
    } else {
      return { gross: null, net: null };
    }
  });

  fees = computed(() => {
    const investment = this.investment();
    if (investment) {
      return this.calcFees(investment);
    } else {
      return { fees: null, feesPercentage: null };
    }
  });

  totals = computed(() => {
    const investment = this.investment();
    if (investment) {
      return this.calcTotals(investment);
    } else {
      return {
        gross: null,
        grossPercentage: null,
        grossValue: null,
        net: null,
        netPercentage: null,
        netValue: null,
      };
    }
  });

  private charType: Plotly.PlotData["type"] = "scatter";

  private charMode: Plotly.PlotData["mode"] = "gauge+number+delta";

  constructor() {
    this.loadInvestment();
  }

  trackByFn(_index: number, item: IInvestmentDailyPosition) {
    return item.id;
  }

  async removeDailyPosition(
    investmentId: string,
    dailyPosition: IInvestmentDailyPosition,
  ) {
    await this.investmentService.deleteDailyPosition(
      investmentId,
      dailyPosition,
    );
    return this.loadInvestment();
  }

  private async loadInvestment() {
    const investmentId = await firstValueFrom(this.investmentId$);
    const investmentRef = await this.investmentService.get(investmentId);
    if (investmentRef.item) {
      this.investment.set(investmentRef.item);
    }
  }

  private generateChartDataBasedOnInvestmentDailyPosition() {
    const valuePlotData = this.getValuePlotData();
    const grossPlotdata = this.getPlotDataByPropertyAndDate(
      "grossValue",
      "orange",
      "Gross",
    );
    const netPlotdata = this.getPlotDataByPropertyAndDate(
      "netValue",
      "green",
      "Net",
    );

    const plotData: Partial<Plotly.PlotData>[] = [
      valuePlotData,
      grossPlotdata,
      netPlotdata,
    ];
    return plotData;
  }

  private getPlotDataByPropertyAndDate(
    prop: keyof IInvestmentDailyPosition,
    color: string,
    name: string,
  ) {
    const dailyPosition = this.investment()?.dailyPosition || [];
    const plotData: Partial<Plotly.PlotData> = dailyPosition.reduce(
      (acc, item) => {
        acc.y.push(item[prop]);
        acc.x.push(new Date(item.date));
        return acc;
      },
      {
        x: [] as any[],
        y: [] as any[],
        type: this.charType,
        mode: this.charMode,
        marker: { color },
        name,
      },
    );
    return plotData;
  }

  private getValuePlotData() {
    const investment = this.investment();
    const dailyPosition = this.investment()?.dailyPosition || [];
    const plotData: Partial<Plotly.PlotData> = dailyPosition.reduce(
      (acc, item) => {
        acc.y.push(investment?.value);
        acc.x.push(new Date(item.date));
        return acc;
      },
      {
        x: [] as any[],
        y: [] as any[],
        type: this.charType,
        mode: this.charMode,
        marker: { color: "blue" },
        name: "Initial",
      },
    );
    return plotData;
  }

  private calcInterestAverage(investment: IInvestment) {
    const today = Date.now();
    const initialDate = investment.startDate;
    const monthInMiliseconds = 60e3 * 60 * 24 * 30;
    const diff = today - initialDate;
    const times = diff / monthInMiliseconds;
    const lastDailyPosition: IInvestmentDailyPosition =
      investment.dailyPosition![0];
    const finalGross = lastDailyPosition.grossValue;
    const finalNet = lastDailyPosition.netValue;
    const initial = investment.value;
    const gross = this.interestService
      .interestByInitialFinalAndTimes(initial, finalGross, times);
    const net = this.interestService
      .interestByInitialFinalAndTimes(initial, finalNet, times);
    return { gross, net };
  }

  private calcFees(investment: IInvestment) {
    const lastDailyPosition: IInvestmentDailyPosition =
      investment.dailyPosition![0];
    const value = investment.value;
    const { grossValue, netValue } = lastDailyPosition;
    const totalGross = grossValue - value;
    const fees = grossValue - netValue;
    const feesPercentage = fees / totalGross;
    return { fees, feesPercentage };
  }

  private calcTotals(investment: IInvestment) {
    const lastDailyPosition: IInvestmentDailyPosition =
      investment.dailyPosition![0];
    const value = investment.value;
    const { grossValue, netValue } = lastDailyPosition;
    const gross = grossValue - value;
    const net = netValue - value;
    const grossPercentage = gross / value;
    const netPercentage = net / value;
    return { gross, grossPercentage, grossValue, net, netPercentage, netValue };
  }
}
