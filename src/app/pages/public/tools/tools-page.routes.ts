import { Routes } from "@angular/router";
import { ToolsPageComponent } from "./tools-page.component";
import { CompoundInterestPageComponent } from "./compound-interest-page/compound-interest-page.component";
import { SnakePageComponent } from "./snake-page/snake-page.component";

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
    path: "snake",
    component: SnakePageComponent,
  },
];
