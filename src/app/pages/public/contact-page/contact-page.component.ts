import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-contact-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./contact-page.component.html",
  styleUrl: "./contact-page.component.scss",
})
export class ContactPageComponent {
}
