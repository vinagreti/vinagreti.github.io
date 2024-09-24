import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { NoteService } from "@services/note/note.service";
import { NOTE_GROUP_TYPE } from "@services/note/note.types";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-note-group-add-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FormsModule, NgFor],
  templateUrl: "./note-group-add-page.component.html",
  styleUrl: "./note-group-add-page.component.scss",
})
export class NoteGroupAddPageComponent {
  private noteService = inject(NoteService);

  private router = inject(Router);

  title: string = "";

  noteGroupType: NOTE_GROUP_TYPE = NOTE_GROUP_TYPE.REGULAR;

  noteGroupTypes = Object.values(NOTE_GROUP_TYPE);

  waitingCreation$ = new BehaviorSubject(false);

  dueDate: string = "";

  constructor() {
    console.log("noteGroupTypes", this.noteGroupTypes);
  }

  async addNoteGroup() {
    this.waitingCreation$.next(true);
    const { error, noteGroup } = await this.noteService.addGroup({
      title: this.title,
      type: this.noteGroupType,
    });
    if (noteGroup) {
      this.router.navigate(["/notes", noteGroup.id]);
    } else {
      alert("Error adding note group!!!");
      console.log("Error adding note group", error.code, error.message);
    }
    this.waitingCreation$.next(false);
  }
}
