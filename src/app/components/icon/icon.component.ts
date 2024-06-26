import { Component, inject, Input, OnChanges } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { ICONS } from "./icons";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
  standalone: true,
})
export class IconComponent implements OnChanges {
  private sanitizer = inject(DomSanitizer);

  @Input()
  icon?: ICONS;

  @Input()
  size = "inherit";

  svgIcon: any;

  ngOnChanges(): void {
    if (!this.icon) {
      this.svgIcon = "";
      return;
    }

    fetch(`assets/icons/${this.icon}.svg`, {
      headers: { responseType: "text" },
    })
      .then((res) => res.text())
      .then((value) => {
        console.log("res", value);
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }
}
