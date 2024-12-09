import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";

@Component({
  selector: "app-resume-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageWrapperComponent],
  templateUrl: "./resume-page.component.html",
  styleUrl: "./resume-page.component.scss",
})
export class ResumePageComponent {
}
