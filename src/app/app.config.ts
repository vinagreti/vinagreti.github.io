import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  isDevMode,
  LOCALE_ID,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideServiceWorker } from "@angular/service-worker";
import {
  CurrencyPipe,
  DATE_PIPE_DEFAULT_OPTIONS,
  DatePipe,
} from "@angular/common";

import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import localePtExtra from "@angular/common/locales/extra/pt";

registerLocaleData(localePt, "pt-BR", localePtExtra);

const localLanguage = navigator.language === "pt-BR" ? "pt-BR" : "en-US";
const localCurrency = localLanguage === "pt-BR" ? "BRL" : "USD";

const getCurrencySymbol = (locale: any, currency: any) =>
  (0).toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).replace(/\d/g, "").trim();

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
    { provide: LOCALE_ID, useValue: localLanguage },
    { provide: DEFAULT_CURRENCY_CODE, useValue: localCurrency },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "dd/MM/yy" },
    },
    DatePipe,
    CurrencyPipe,
  ],
};
