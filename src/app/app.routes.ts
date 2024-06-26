import { Routes } from "@angular/router";
import { ProjectsPageComponent } from "./pages/public/project/projects-page/projects-page.component";
import { HomePageComponent } from "./pages/public/home-page/home-page.component";
import { ResumePageComponent } from "./pages/public/resume-page/resume-page.component";
import { ContactPageComponent } from "./pages/public/contact-page/contact-page.component";

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "projects",
    component: ProjectsPageComponent,
  },
  {
    path: "resume",
    component: ResumePageComponent,
  },
  {
    path: "contact",
    component: ContactPageComponent,
  },
];
