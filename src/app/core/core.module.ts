import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import localeDeAt from "@angular/common/locales/pt";

registerLocaleData(localeDeAt);

@NgModule({
  providers: [{ provide: LOCALE_ID, useValue: "pt" }],
  imports: [
    CommonModule,
  ],
})
export class CoreModule {}
