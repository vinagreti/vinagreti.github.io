import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";

@Component({
  selector: "app-tools-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageWrapperComponent],
  templateUrl: "./tools-page.component.html",
  styleUrl: "./tools-page.component.scss",
})
export class ToolsPageComponent {
}
