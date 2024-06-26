import { AsyncPipe, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { map, ReplaySubject } from "rxjs";
import { IconComponent } from "./components/icon/icon.component";

const LIGHT_BASE_COLORS = [
  "text-primary",
  "bg-primary-contrast",
];

const DARK_BASE_COLORS = [
  "text-primary-contrast",
  "bg-secondary",
];

type ColorScheme = "light" | "dark";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf, IconComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "vinagreti";

  colorScheme$ = new ReplaySubject<ColorScheme>();

  baseColors$ = this.colorScheme$.pipe(map((colorScheme) => {
    const baseColors = colorScheme === "dark"
      ? DARK_BASE_COLORS
      : LIGHT_BASE_COLORS;
    return baseColors;
  }));

  constructor() {
    this.applyCurrentColorScheme();
    this.listenToColorSchemaChanges();
  }

  toggleTheme() {
    const inMemoryColorScheme = this.getInMemoryColorScheme();
    const newColorScheme = inMemoryColorScheme === "dark" ? "light" : "dark";
    this.applyNewColorScheme(newColorScheme);
  }

  private getBrowserColorScheme(): ColorScheme {
    const darkMode = window?.matchMedia &&
      window?.matchMedia("(prefers-color-scheme: dark)").matches;
    return darkMode ? "dark" : "light";
  }

  private applyCurrentColorScheme() {
    const browserColorScheme = this.getBrowserColorScheme();
    const inMemoryColorScheme = this.getInMemoryColorScheme();
    const colorScheme = inMemoryColorScheme || browserColorScheme;
    this.colorScheme$.next(colorScheme);
  }

  private applyNewColorScheme(colorScheme: ColorScheme) {
    this.setInMemoryColorScheme(colorScheme);
    this.colorScheme$.next(colorScheme);
  }

  private listenToColorSchemaChanges() {
    window?.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      (event) => {
        const browserColorScheme = this.getBrowserColorScheme();
        this.applyNewColorScheme(browserColorScheme);
      },
    );
  }

  private getInMemoryColorScheme(): ColorScheme {
    const colorScheme = localStorage?.["colorScheme"];
    return colorScheme;
  }

  private setInMemoryColorScheme(colorScheme: ColorScheme) {
    localStorage?.setItem("colorScheme", colorScheme);
  }

  private ensureSavedBrowserColorSchema() {
    const inMemoryColorScheme = this.getInMemoryColorScheme();
    if (!inMemoryColorScheme) {
      const browserColorScheme = this.getBrowserColorScheme();
      this.setInMemoryColorScheme(browserColorScheme);
    }
  }
}
