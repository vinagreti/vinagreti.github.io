import { AsyncPipe, CurrencyPipe, NgFor, PercentPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { combineLatest, map, ReplaySubject } from "rxjs";

@Component({
  selector: "app-compound-interest-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, AsyncPipe, CurrencyPipe, NgFor, PercentPipe],
  templateUrl: "./compound-interest-page.component.html",
  styleUrl: "./compound-interest-page.component.scss",
})
export class CompoundInterestPageComponent {
  totalWithInterest$ = new ReplaySubject<number>();

  totalWithoutInterest$ = new ReplaySubject<number>();

  installments$ = new ReplaySubject<
    {
      index: number;
      monthlyDeposit: number;
      totalWithInterest: number;
      interest: number;
    }[]
  >();

  gain$ = combineLatest([this.totalWithInterest$, this.totalWithoutInterest$])
    .pipe(
      map(([totalWithInterest, totalWithoutInterest]) =>
        totalWithInterest - totalWithoutInterest
      ),
    );

  data = {
    times: null,
    initialValue: null,
    monthlyDeposit: null,
    interest: null,
  };

  calc() {
    const initialValue = this.data.initialValue || 0;
    const interest = (this.data.interest || 0) / 100;
    const monthlyDeposit = this.data.monthlyDeposit || 0;
    const times = this.data.times || 0;
    let totalWithInterest = initialValue;
    let totalWithoutInterest = initialValue;
    let installments = [];
    for (let i = 0; i < times; i++) {
      const totalCompounded = totalWithInterest * interest;
      const totalWithMothly = totalCompounded + monthlyDeposit;
      totalWithInterest += totalWithMothly;
      totalWithoutInterest += monthlyDeposit;
      installments.push({
        index: i + 1,
        monthlyDeposit,
        totalWithInterest,
        interest: totalCompounded,
      });
    }
    this.totalWithInterest$.next(totalWithInterest);
    this.totalWithoutInterest$.next(totalWithoutInterest);
    this.installments$.next(installments);
  }
}
