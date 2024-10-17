import { AsyncPipe, NgClass, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { BadgeComponent } from "@components/ui/badge/badge.component";
import { NoteService } from "@services/note/note.service";
import { INote, INoteGroup } from "@services/note/note.types";
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Component({
  selector: "app-note-group-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    RouterModule,
    BadgeComponent,
    NgClass,
    FormsModule,
  ],
  templateUrl: "./note-group-page.component.html",
  styleUrl: "./note-group-page.component.scss",
})
export class NoteGroupPageComponent {
  noteService = inject(NoteService);

  route = inject(ActivatedRoute);

  noteGroup$ = new BehaviorSubject<INoteGroup | null>(null);

  loading$ = new ReplaySubject<boolean>(1);

  constructor() {
    this.loadNoteGroup();
  }

  copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
  }

  private async loadNoteGroup() {
    const noteGroupId = this.route.snapshot.params["noteGroupId"];
    const noteGroup = await this.noteService.group(noteGroupId);
    this.noteGroup$.next(noteGroup);
  }

  async removeNote(groupId: string, note: INote) {
    await this.noteService.deleteNote(groupId, note);
    return this.loadNoteGroup();
  }

  async onChangeGroup(noteGroup: INoteGroup) {
    const update = await this.noteService.editGroup(noteGroup);
    return this.loadNoteGroup();
  }

  async onChangeNote(noteGroup: INoteGroup, note: INote) {
    const update = await this.noteService.editNote(noteGroup.id, note);
    return this.loadNoteGroup();
  }
}
