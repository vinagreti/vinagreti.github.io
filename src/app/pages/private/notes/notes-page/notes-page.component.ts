import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NoteService } from "@services/note/note.service";
import { INoteGroup } from "@services/note/note.types";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-notes-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, AsyncPipe, RouterLink],
  templateUrl: "./notes-page.component.html",
  styleUrl: "./notes-page.component.scss",
})
export class NotesPageComponent {
  noteService = inject(NoteService);

  noteGroups$ = new BehaviorSubject<INoteGroup[]>([]);

  constructor() {
    this.loadNoteGroups();
  }

  trackBy(index: number, item: INoteGroup) {
    return item.id;
  }

  async removeNoteGroup(noteGroup: INoteGroup) {
    const dropResponse = await this.noteService.deleteGroup(noteGroup);
    return this.loadNoteGroups();
  }

  private async loadNoteGroups() {
    const noteGroups = await this.noteService.list();
    this.noteGroups$.next(noteGroups);
  }
}
