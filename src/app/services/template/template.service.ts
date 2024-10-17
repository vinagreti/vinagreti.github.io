import { Injectable } from "@angular/core";
import { map, ReplaySubject } from "rxjs";

const LIGHT_BASE_COLORS = [
  "text-secondary",
  "bg-secondary-contrast",
];

const DARK_BASE_COLORS = [
  "text-secondary-contrast",
  "bg-primary",
];

type ColorScheme = "light" | "dark";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  colorScheme$ = new ReplaySubject<ColorScheme>(1);

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
    this.setInMemoryColorScheme(colorScheme);
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
}
