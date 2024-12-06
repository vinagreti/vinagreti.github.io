import { PercentPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule, NgForm } from "@angular/forms";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";
import { InterestService } from "@services/interest/interest.service";
import { filter } from "rxjs";

type FormData = {
  initial: number | null;
  final: number | null;
  times: number | null;
};

@Component({
  selector: "app-interest-by-initial-final-months-page",
  standalone: true,
  imports: [PageWrapperComponent, FormsModule, PercentPipe],
  templateUrl: "./interest-by-initial-final-months-page.component.html",
  styleUrl: "./interest-by-initial-final-months-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterestByInitialFinalMonthsPageComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  resul = signal<number | null>(null);

  private interestService = inject(InterestService);

  formData: FormData = {
    initial: null,
    final: null,
    times: null,
  };

  @ViewChild("form", { static: true })
  form!: NgForm;

  ngOnInit() {
    this.watchFormChangeAndCalc();
  }

  private watchFormChangeAndCalc() {
    this.form.valueChanges?.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(() => !!this.form.valid),
    ).subscribe(
      this.calc,
    );
  }

  private calc = ({ initial, final, times }: FormData) => {
    const interestRate = this.interestService.interestByInitialFinalAndTimes(
      initial!,
      final!,
      times!,
    );
    this.resul.set(interestRate);
  };
}
