import { Routes } from "@angular/router";
import { ProjectsPageComponent } from "./pages/public/project/projects-page/projects-page.component";
import { HomePageComponent } from "./pages/public/home-page/home-page.component";

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "projects",
    component: ProjectsPageComponent,
  },
];
