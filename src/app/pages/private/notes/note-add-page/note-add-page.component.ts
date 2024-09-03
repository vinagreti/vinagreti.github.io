import { AsyncPipe, NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NoteService } from "@services/note/note.service";
import { INoteGroup } from "@services/note/note.types";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-note-add-page",
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgFor],
  templateUrl: "./note-add-page.component.html",
  styleUrl: "./note-add-page.component.scss",
})
export class NoteAddPageComponent {
  private noteService = inject(NoteService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  title: string = "";

  content: string = "";

  noteGroup: string = this.route.snapshot.params["noteGroupId"];

  waitingCreation$ = new BehaviorSubject(false);

  noteGroups$ = new BehaviorSubject<INoteGroup[]>([]);

  constructor() {
    this.loadNoteGroups();
  }

  private async loadNoteGroups() {
    const noteGroups = await this.noteService.list();
    this.noteGroups$.next(noteGroups);
  }

  async addNote() {
    this.waitingCreation$.next(true);
    const { error, note } = await this.noteService.add(this.noteGroup, {
      title: this.title,
      content: this.content,
    });
    if (note) {
      await this.router.navigate(["/notes", this.noteGroup]);
      this.router.navigate(["/notes", this.noteGroup, note.id]);
    } else {
      alert("Error adding note group!!!");
      console.log("Error adding note group", error.code, error.message);
    }
    this.waitingCreation$.next(false);
  }
}
