import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { combineLatest, map, ReplaySubject } from "rxjs";

@Component({
  selector: "app-compound-interest-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, AsyncPipe, CurrencyPipe],
  templateUrl: "./compound-interest-page.component.html",
  styleUrl: "./compound-interest-page.component.scss",
})
export class CompoundInterestPageComponent {
  totalWithInterest$ = new ReplaySubject<number>();

  totalWithoutInterest$ = new ReplaySubject<number>();

  gain$ = combineLatest([this.totalWithInterest$, this.totalWithoutInterest$])
    .pipe(
      map(([totalWithInterest, totalWithoutInterest]) =>
        totalWithInterest - totalWithoutInterest
      ),
    );

  data = {
    times: 0,
    initialValue: 0,
    monthlyDeposit: 0,
    interest: 0,
  };

  calc() {
    const { initialValue, interest, monthlyDeposit, times } = this.data;
    let totalWithInterest = initialValue;
    let totalWithoutInterest = initialValue;
    for (let i = 0; i < times; i++) {
      const totalWithMothly = (totalWithInterest * interest) + monthlyDeposit;
      totalWithInterest += totalWithMothly;
      totalWithoutInterest += monthlyDeposit;
    }
    this.totalWithInterest$.next(totalWithInterest);
    this.totalWithoutInterest$.next(totalWithoutInterest);
  }
}
