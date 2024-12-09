import { AsyncPipe, CurrencyPipe, DatePipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { PageWrapperActionsComponent } from "@components/ui/page-wrapper/page-wrapper-actions/page-wrapper-actions.component";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";
import { InvestmentService } from "@services/investment/investment.service";
import { IInvestment } from "@services/investment/investment.types";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-investment-list-page",
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
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
  investmentService = inject(InvestmentService);

  investments$ = new BehaviorSubject<IInvestment[]>([]);

  constructor() {
    this.loadInvestments();
  }

  trackBy(_index: number, item: IInvestment) {
    return item.id;
  }

  async removeInvestment(investment: IInvestment) {
    const dropResponse = await this.investmentService.delete(investment);
    return this.loadInvestments();
  }

  private async loadInvestments() {
    const investments = await this.investmentService.list();
    this.investments$.next(investments);
  }
}
