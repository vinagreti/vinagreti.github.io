import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-resume-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./resume-page.component.html",
  styleUrl: "./resume-page.component.scss",
})
export class ResumePageComponent {
}
