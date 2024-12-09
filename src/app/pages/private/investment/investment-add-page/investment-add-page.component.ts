import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";
import { InvestmentService } from "@services/investment/investment.service";
import { INVESTMENT_STATUS } from "@services/investment/investment.types";
import { ReplaySubject } from "rxjs";

@Component({
  selector: "app-investment-add-page",
  standalone: true,
  imports: [AsyncPipe, RouterModule, FormsModule, PageWrapperComponent],
  templateUrl: "./investment-add-page.component.html",
  styleUrl: "./investment-add-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestmentAddPageComponent {
  formData = {
    title: "",
    value: 0,
    startDate: 0,
    dueDate: 0,
    status: INVESTMENT_STATUS.RUNNING,
  };

  investmentStatus: INVESTMENT_STATUS = INVESTMENT_STATUS.RUNNING;

  waitingCreation$ = new ReplaySubject<boolean>(1);

  investmentStatuses = Object.values(INVESTMENT_STATUS);

  private investmentService = inject(InvestmentService);

  private router = inject(Router);

  async addNewItem() {
    this.waitingCreation$.next(true);

    const { error, investment } = await this.investmentService.add({
      title: this.formData.title,
      value: this.formData.value,
      startDate: this.formData.startDate,
      dueDate: this.formData.dueDate,
      status: this.formData.status,
      created: Date.now(),
      updated: Date.now(),
    });

    if (investment) {
      this.router.navigate(["/investment", investment.id]);
    } else {
      alert("Error adding investment!!!");
      console.log("Error adding investment", error.code, error.message);
    }

    this.waitingCreation$.next(false);
  }
}
