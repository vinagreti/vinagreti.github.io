import { Routes } from "@angular/router";
import { ProjectsPageComponent } from "./pages/public/project/projects-page/projects-page.component";
import { HomePageComponent } from "./pages/public/home-page/home-page.component";
import { ResumePageComponent } from "./pages/public/resume-page/resume-page.component";
import { ContactPageComponent } from "./pages/public/contact-page/contact-page.component";
import { NotesPageComponent } from "./pages/private/notes/notes-page/notes-page.component";
import { NoteGroupPageComponent } from "./pages/private/notes/note-group-page/note-group-page.component";
import { NotePageComponent } from "./pages/private/notes/note-page/note-page.component";
import { LoginPageComponent } from "./pages/public/login-page/login-page.component";
import { NoteAddPageComponent } from "./pages/private/notes/note-add-page/note-add-page.component";
import { NoteGroupAddPageComponent } from "./pages/private/notes/note-group-add-page/note-group-add-page.component";

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
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "notes/add",
    component: NoteAddPageComponent,
  },
  {
    path: "notes/add/:noteGroupId",
    component: NoteAddPageComponent,
  },
  {
    path: "notes/group/add",
    component: NoteGroupAddPageComponent,
  },
  {
    path: "notes/:noteGroupId/:noteId",
    component: NotePageComponent,
  },
  {
    path: "notes/:noteGroupId",
    component: NoteGroupPageComponent,
  },
  {
    path: "notes",
    component: NotesPageComponent,
  },
];
