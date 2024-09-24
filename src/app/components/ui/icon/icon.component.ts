import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ICONS } from "./icons";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class IconComponent {
  private sanitizer = inject(DomSanitizer);

  icon = input.required<ICONS>();

  size = input<string>("inherit");

  svgIcon = signal<SafeHtml | null>(null);

  constructor() {
    effect(async () => {
      const icon = this.icon();
      if (icon) {
        const iconSvg = await this.fetchIcon(icon);
        this.svgIcon.set(iconSvg);
      } else {
        this.svgIcon.set("");
      }
    });
  }

  private fetchIcon(icon: ICONS) {
    return fetch(`icons/${icon}.svg`, {
      headers: { responseType: "text" },
    })
      .then((res) => res.text())
      .then((value) => this.sanitizer.bypassSecurityTrustHtml(value));
  }
}
