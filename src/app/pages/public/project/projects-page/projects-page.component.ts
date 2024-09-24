import { ChangeDetectionStrategy, Component } from "@angular/core";
import { projects } from "./projects";
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { BadgeComponent } from "@components/ui/badge/badge.component";

@Component({
  selector: "app-projects-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, DatePipe, NgIf, RouterLink, BadgeComponent],
  templateUrl: "./projects-page.component.html",
  styleUrl: "./projects-page.component.scss",
})
export class ProjectsPageComponent {
  projects = projects;
}
