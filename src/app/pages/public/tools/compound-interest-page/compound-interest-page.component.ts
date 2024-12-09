import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";
import { combineLatest, map, ReplaySubject } from "rxjs";

export type CompoundData = {
  times: number | null;
  initialValue: number | null;
  interest: number | null;
  apports: {
    value: number;
    installments: {
      [key: number]: boolean;
    };
  }[];
};

@Component({
  selector: "app-compound-interest-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    AsyncPipe,
    CurrencyPipe,
    NgFor,
    NgIf,
    PageWrapperComponent,
  ],
  templateUrl: "./compound-interest-page.component.html",
  styleUrl: "./compound-interest-page.component.scss",
})
export class CompoundInterestPageComponent implements OnInit {
  totalWithInterest$ = new ReplaySubject<number>(1);

  totalWithoutInterest$ = new ReplaySubject<number>(1);

  installmentIndexes$ = new ReplaySubject<number[]>(1);

  installments$ = new ReplaySubject<
    {
      index: number;
      apport: number;
      totalWithInterest: number;
      interest: number;
    }[]
  >(1);

  gain$ = combineLatest([this.totalWithInterest$, this.totalWithoutInterest$])
    .pipe(
      map(([totalWithInterest, totalWithoutInterest]) =>
        totalWithInterest - totalWithoutInterest
      ),
    );

  data = this.getFromMemory();

  ngOnInit(): void {
    this.calc();
  }

  calc() {
    this.saveToMemory(this.data);
    const initialValue = this.data.initialValue || 0;
    const interest = (this.data.interest || 0) / 100;
    const times = this.data.times || 0;
    let totalWithInterest = initialValue;
    let totalWithoutInterest = initialValue;
    const installmentIndexes: number[] = [];
    const installments = [
      {
        index: 1,
        apport: initialValue,
        totalWithInterest: initialValue,
        interest: 0,
      },
    ];

    const apports: { [key: number]: number } = {};

    this.data.apports.forEach((apport) => {
      Object.keys(apport.installments).forEach((key) => {
        const installmentIndex = parseInt(key);
        const hasApport = apport.installments[installmentIndex];
        if (hasApport) {
          apports[installmentIndex] = apports[installmentIndex] || 0;
          apports[installmentIndex] += apport.value;
        }
      });
    });

    for (
      let installmentIndex = 1;
      installmentIndex <= times;
      installmentIndex++
    ) {
      installmentIndexes.push(installmentIndex);
      const apport = apports[installmentIndex] || 0;
      const totalCompounded = totalWithInterest * interest;
      const totalWithMothly = totalCompounded + apport;
      totalWithInterest += totalWithMothly;
      totalWithoutInterest += apport;
      installments.push({
        index: installmentIndex,
        apport,
        totalWithInterest,
        interest: totalCompounded,
      });
    }
    this.totalWithInterest$.next(totalWithInterest);
    this.totalWithoutInterest$.next(totalWithoutInterest);
    this.installments$.next(installments);
    this.installmentIndexes$.next(installmentIndexes);
  }

  private saveToMemory(compoundData: CompoundData) {
    const stringData = JSON.stringify(compoundData);
    localStorage.setItem("insterest", stringData);
  }

  private getFromMemory(): CompoundData {
    const stringData = localStorage.getItem("insterest");
    if (stringData) {
      const compoundData = JSON.parse(stringData);
      return compoundData;
    } else {
      return {
        times: null,
        initialValue: null,
        interest: null,
        apports: [{
          value: 0,
          installments: {} as { [key: number]: boolean },
        }],
      };
    }
  }
}
