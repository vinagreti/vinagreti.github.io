import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-badge",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./badge.component.html",
  styleUrl: "./badge.component.scss",
})
export class BadgeComponent {
}
