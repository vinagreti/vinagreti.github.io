import { Component } from "@angular/core";
import { projects } from "./projects";
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-projects-page",
  standalone: true,
  imports: [NgFor, DatePipe, NgIf, RouterLink],
  templateUrl: "./projects-page.component.html",
  styleUrl: "./projects-page.component.scss",
})
export class ProjectsPageComponent {
  projects = projects;
}
