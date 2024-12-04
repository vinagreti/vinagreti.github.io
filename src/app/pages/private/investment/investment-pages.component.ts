import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-investment-pages",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./investment-pages.component.html",
  styleUrl: "./investment-pages.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestmentPagesComponent {
}
