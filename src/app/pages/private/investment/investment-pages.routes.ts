import { Routes } from "@angular/router";
import { InvestmentPagesComponent } from "./investment-pages.component";
import { InvestmentListPageComponent } from "./investment-list-page/investment-list-page.component";
import { InvestmentAddPageComponent } from "./investment-add-page/investment-add-page.component";
import { InvestmentPositionAddPageComponent } from "./investment-position-add-page/investment-position-add-page.component";
import { InvestmentDetailsPageComponent } from "./investment-details-page/investment-details-page.component";

export const routes: Routes = [
  {
    path: "",
    component: InvestmentPagesComponent,
    children: [
      {
        path: "",
        component: InvestmentListPageComponent,
      },
      {
        path: "add",
        component: InvestmentAddPageComponent,
      },
      {
        path: ":investmentId/position-add",
        component: InvestmentPositionAddPageComponent,
      },
      {
        path: ":investmentId",
        component: InvestmentDetailsPageComponent,
      },
    ],
  },
];
