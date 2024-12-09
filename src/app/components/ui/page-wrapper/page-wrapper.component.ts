import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { PageWrapperActionsComponent } from "./page-wrapper-actions/page-wrapper-actions.component";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-page-wrapper",
  standalone: true,
  imports: [RouterLink, PageWrapperActionsComponent, NgIf],
  templateUrl: "./page-wrapper.component.html",
  styleUrl: "./page-wrapper.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWrapperComponent {
  title = input.required<string>();

  backTo = input<string | string[]>("/");
}
