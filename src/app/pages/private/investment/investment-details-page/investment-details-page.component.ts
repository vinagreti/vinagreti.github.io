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
  effect,
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

@Component({
  selector: "app-investment-details-page",
  standalone: true,
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
  ],
  templateUrl: "./investment-details-page.component.html",
  styleUrl: "./investment-details-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestmentDetailsPageComponent {
  investmentService = inject(InvestmentService);

  investment = signal<IInvestment | null>(null);

  grossInterestAverage = signal<number | null>(null);

  netInterestAverage = signal<number | null>(null);

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

  private charType: Plotly.PlotData["type"] = "scatter";

  private charMode: Plotly.PlotData["mode"] = "gauge+number+delta";

  constructor() {
    this.loadInvestment();

    effect(() => {
      const investment = this.investment();
      if (investment) {
        this.calcInterestAverage(investment);
      }
    }, { allowSignalWrites: true });
  }

  trackByFn(_index: number, item: IInvestmentDailyPosition) {
    return item.id;
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
      grossPlotdata,
      netPlotdata,
      valuePlotData,
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
      (acc, item, index) => {
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
      (acc, item, index) => {
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
    const grossInterestAverage = this.interestService
      .interestByInitialFinalAndTimes(initial, finalGross, times);
    const netInterestAverage = this.interestService
      .interestByInitialFinalAndTimes(initial, finalNet, times);
    this.grossInterestAverage.set(grossInterestAverage);
    this.netInterestAverage.set(netInterestAverage);
  }
}
