import { Routes } from "@angular/router";
import { ToolsPageComponent } from "./tools-page.component";
import { CompoundInterestPageComponent } from "./compound-interest-page/compound-interest-page.component";
import { SnakePageComponent } from "./snake-page/snake-page.component";
import { InterestByInitialFinalMonthsPageComponent } from "./interest-by-initial-final-months-page/interest-by-initial-final-months-page.component";

export const routes: Routes = [
  {
    path: "",
    component: ToolsPageComponent,
  },
  {
    path: "compound-interest",
    component: CompoundInterestPageComponent,
  },
  {
    path: "paid-interest",
    component: InterestByInitialFinalMonthsPageComponent,
  },
  {
    path: "snake",
    component: SnakePageComponent,
  },
];
