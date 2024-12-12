import { CurrencyPipe, DatePipe, NgFor } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { PageWrapperActionsComponent } from "@components/ui/page-wrapper/page-wrapper-actions/page-wrapper-actions.component";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";
import { InvestmentService } from "@services/investment/investment.service";
import { IInvestment } from "@services/investment/investment.types";
import { DocumentData, DocumentSnapshot } from "firebase/firestore/lite";

@Component({
  selector: "app-investment-list-page",
  imports: [
    RouterLink,
    NgFor,
    DatePipe,
    CurrencyPipe,
    PageWrapperComponent,
    PageWrapperActionsComponent,
  ],
  templateUrl: "./investment-list-page.component.html",
  styleUrl: "./investment-list-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestmentListPageComponent {
  private currencyPipe = inject(CurrencyPipe);

  investmentService = inject(InvestmentService);

  investments = signal<{
    snapshot: DocumentSnapshot<DocumentData, DocumentData>;
    item: IInvestment;
  }[]>([]);

  totals = computed(() => {
    return this.computeTotals();
  });

  constructor() {
    this.loadInvestments();
  }

  trackBy(_index: number, item: {
    snapshot: DocumentSnapshot<DocumentData, DocumentData>;
    item: IInvestment;
  }) {
    return item.item.id;
  }

  async removeInvestment(investment: IInvestment) {
    const dropResponse = await this.investmentService.delete(investment);
    return this.loadInvestments();
  }

  private async loadInvestments() {
    const investments = await this.investmentService.list();
    this.investments.set(investments);
  }

  private computeTotals() {
    const totalsByInvestment = this.investments()?.map(
      ({ item: investment }) => {
        const { value, dailyPosition } = investment;
        const lastDailyPosition = dailyPosition?.[0];
        if (lastDailyPosition) {
          const { grossValue, netValue } = lastDailyPosition;
          return {
            net: netValue,
            gross: grossValue,
            fees: grossValue - netValue,
            value,
          };
        } else {
          return {
            net: value,
            gross: value,
            fees: value,
            value,
          };
        }
      },
    );

    const overallTotals = totalsByInvestment.reduce((acc, investment) => {
      return {
        net: acc.net + investment.net,
        gross: acc.gross + investment.gross,
        fees: acc.fees + investment.fees,
        value: acc.value + investment.value,
      };
    }, {
      net: 0,
      gross: 0,
      fees: 0,
      value: 0,
    });

    return overallTotals;
  }
}
