import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NoteService } from "@services/note/note.service";
import {
  INoteGroup,
  NOTE_GROUP_TYPE,
  NOTE_STATUS,
} from "@services/note/note.types";
import { ReplaySubject } from "rxjs";

@Component({
  selector: "app-note-add-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  noteStatus: NOTE_STATUS = NOTE_STATUS.PENDING;

  noteGroupType = NOTE_GROUP_TYPE;

  groupId: string = this.route.snapshot.params["noteGroupId"];

  noteGroup: string = this.groupId;

  waitingCreation$ = new ReplaySubject<boolean>(1);

  noteGroups$ = new ReplaySubject<INoteGroup[]>(1);

  noteGroup$ = new ReplaySubject<INoteGroup>(1);

  noteStatuses = Object.values(NOTE_STATUS);

  constructor() {
    this.loadNoteGroups();
    this.loadNoteGroup();
  }

  private async loadNoteGroup() {
    const noteGroup = await this.noteService.group(this.groupId);
    this.noteGroup$.next(noteGroup);
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
      status: this.noteStatus,
      created: Date.now(),
      updated: Date.now(),
    });

    if (note) {
      this.router.navigate(["/notes", this.noteGroup]);
    } else {
      alert("Error adding note!!!");
      console.log("Error adding note", error.code, error.message);
    }

    this.waitingCreation$.next(false);
  }
}
