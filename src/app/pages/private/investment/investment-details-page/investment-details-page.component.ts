import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { InvestmentService } from "@services/investment/investment.service";
import { IInvestment } from "@services/investment/investment.types";
import { BehaviorSubject, firstValueFrom, map } from "rxjs";

@Component({
  selector: "app-investment-details-page",
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterModule],
  templateUrl: "./investment-details-page.component.html",
  styleUrl: "./investment-details-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestmentDetailsPageComponent {
  investmentService = inject(InvestmentService);

  investment$ = new BehaviorSubject<IInvestment | null>(null);

  route = inject(ActivatedRoute);

  investmentId$ = this.route.params.pipe(
    map((params) => params["investmentId"]),
  );

  constructor() {
    this.loadInvestment();
  }

  trackByFn(_index: number, item: IInvestment) {
    return item.id;
  }

  private async loadInvestment() {
    const investmentId = await firstValueFrom(this.investmentId$);
    const investmentRef = await this.investmentService.get(investmentId);
    if (investmentRef?.item) {
      this.investment$.next(investmentRef.item);
    }
  }
}
