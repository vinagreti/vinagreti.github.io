import { Routes } from "@angular/router";
import { ToolsPageComponent } from "./tools-page.component";
import { CompoundInterestPageComponent } from "./compound-interest-page/compound-interest-page.component";

export const routes: Routes = [
  {
    path: "",
    component: ToolsPageComponent,
  },
  {
    path: "compound-interest",
    component: CompoundInterestPageComponent,
  },
];
