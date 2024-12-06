import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-page-wrapper",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./page-wrapper.component.html",
  styleUrl: "./page-wrapper.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWrapperComponent {
  title = input.required<string>();

  backTo = input<string>();
}
