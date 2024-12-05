import {
  AsyncPipe,
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

@Component({
  selector: "app-investment-details-page",
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
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

  route = inject(ActivatedRoute);

  investmentId$ = this.route.params.pipe(
    map((params) => params["investmentId"]),
  );

  todayDateTime = Date.now();

  chartData = computed(() => {
    const newChartData = this.generateChartDataBasedOnInvestmentDailyPosition();
    return newChartData;
  });

  constructor() {
    this.loadInvestment();
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

  private mountChartData() {
    const chartData = [];
  }

  private generateChartDataBasedOnInvestmentDailyPosition() {
    const valuePlotData = this.getValuePlotData();
    const grossPlotdata = this.getPlotDataByPropertyAndDate(
      "grossValue",
      "orange",
      "Atual Bruto",
    );
    const netPlotdata = this.getPlotDataByPropertyAndDate(
      "netValue",
      "green",
      "Atual Líquido",
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
        type: "scatter",
        mode: "lines+points" as any,
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
        type: "scatter",
        mode: "lines+points" as any,
        marker: { color: "blue" },
        name: "Valor Inicial",
      },
    );
    return plotData;
  }
}
