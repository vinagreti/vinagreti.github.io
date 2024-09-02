import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NoteService } from "@services/note/note.service";
import { INote } from "@services/note/note.types";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-note-page",
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterModule],
  templateUrl: "./note-page.component.html",
  styleUrl: "./note-page.component.scss",
})
export class NotePageComponent {
  noteService = inject(NoteService);

  note$ = new BehaviorSubject<INote | null>(null);

  route = inject(ActivatedRoute);

  constructor() {
    this.loadNote();
  }

  private async loadNote() {
    const noteGroupId = this.route.snapshot.params["noteGroupId"];
    const noteId = this.route.snapshot.params["noteId"];
    const noteRef = await this.noteService.note(
      noteGroupId,
      noteId,
    );
    if (noteRef?.item) {
      this.note$.next(noteRef.item);
    }
  }
}
