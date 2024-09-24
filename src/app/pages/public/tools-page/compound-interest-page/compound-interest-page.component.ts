import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReplaySubject } from "rxjs";

@Component({
  selector: "app-compound-interest-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, AsyncPipe],
  templateUrl: "./compound-interest-page.component.html",
  styleUrl: "./compound-interest-page.component.scss",
})
export class CompoundInterestPageComponent {
  total$ = new ReplaySubject<number>();

  data = {
    times: 0,
    initialValue: 0,
    monthlyDeposit: 0,
    interest: 0,
  };

  calc() {
    this.total$.next(100);
  }
}
