import { DatePipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { InvestmentService } from "@services/investment/investment.service";
import { IInvestmentDailyPosition } from "@services/investment/investment.types";
import { ReplaySubject } from "rxjs";

@Component({
  selector: "app-investment-position-add-page",
  standalone: true,
  imports: [FormsModule, RouterModule, DatePipe, NgIf],
  templateUrl: "./investment-position-add-page.component.html",
  styleUrl: "./investment-position-add-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestmentPositionAddPageComponent {
  private route = inject(ActivatedRoute);

  raw: string = "";

  parsed: Omit<IInvestmentDailyPosition, "id"> | null = null;

  waitingCreation$ = new ReplaySubject<boolean>(1);

  investmentId: string = this.route.snapshot.params["investmentId"];

  private investmentService = inject(InvestmentService);

  private router = inject(Router);

  parse() {
    const sanitized = this.raw.replaceAll("\n", " ").replaceAll("  ", " ")
      .replaceAll(".", "")
      .replaceAll(",", ".");
    const parts = sanitized.split(" ");
    this.parsed = {
      IOF: parseFloat(parts[11]),
      IR: parseFloat(parts[23]),
      netValue: parseFloat(parts[20]),
      grossValue: parseFloat(parts[28]),
      date: Date.now(),
    };
  }

  async add() {
    this.waitingCreation$.next(true);

    const { error, item } = await this.investmentService.addDailyPosition(
      this.investmentId,
      this.parsed!,
    );

    if (item) {
      this.router.navigate(["/investment", this.investmentId]);
    } else {
      alert("Error adding investment!!!");
      console.log("Error adding investment", error.code, error.message);
    }

    this.waitingCreation$.next(false);
  }
}
