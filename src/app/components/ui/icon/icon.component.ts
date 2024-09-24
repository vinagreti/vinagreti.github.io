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
    this.watchIconChangeAndFetchSvg();
  }

  private watchIconChangeAndFetchSvg() {
    effect(async () => {
      const icon = this.icon();
      if (icon) {
        const iconSvg = await this.fetchIcon(icon);
        this.svgIcon.set(iconSvg);
      } else {
        this.svgIcon.set(null);
      }
    });
  }

  private async fetchIcon(icon: ICONS) {
    const url = `icons/${icon}.svg`;
    const rawResponse = await fetch(url, { headers: { responseType: "text" } });
    const textResponse = await rawResponse.text();
    const html = this.sanitizer.bypassSecurityTrustHtml(textResponse);
    return html;
  }
}
