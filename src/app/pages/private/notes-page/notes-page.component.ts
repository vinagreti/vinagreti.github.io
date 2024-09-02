import { AsyncPipe, NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { NoteService } from "@services/note/note.service";
import { INote } from "@services/note/note.types";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-notes-page",
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: "./notes-page.component.html",
  styleUrl: "./notes-page.component.scss",
})
export class NotesPageComponent {
  noteService = inject(NoteService);

  notes$ = new BehaviorSubject<INote[]>([]);

  constructor() {
    this.test();
  }

  private async test() {
    const notes = await this.noteService.list();
    this.notes$.next(notes);
  }
}
