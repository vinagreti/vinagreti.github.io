import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { IconComponent } from "./components/icon/icon.component";
import { TemplateService } from "@services/template/template.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, NgIf, IconComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  templateService = inject(TemplateService);
}
