import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { PageWrapperActionsComponent } from "@components/ui/page-wrapper/page-wrapper-actions/page-wrapper-actions.component";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";
import { NoteService } from "@services/note/note.service";
import {
  INote,
  INoteGroup,
  NOTE_GROUP_TYPE,
  NOTE_STATUS,
} from "@services/note/note.types";
import { BehaviorSubject, firstValueFrom, ReplaySubject } from "rxjs";

@Component({
  selector: "app-note-group-page",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    RouterModule,
    FormsModule,
    PageWrapperComponent,
    PageWrapperActionsComponent,
  ],
  templateUrl: "./note-group-page.component.html",
  styleUrl: "./note-group-page.component.scss",
})
export class NoteGroupPageComponent {
  noteService = inject(NoteService);

  route = inject(ActivatedRoute);

  noteGroup$ = new BehaviorSubject<INoteGroup | null>(null);

  loading$ = new ReplaySubject<boolean>(1);

  showNewItemForm$ = new ReplaySubject<boolean>(1);

  noteGroupType = NOTE_GROUP_TYPE;

  noteGroupTypes = Object.values(NOTE_GROUP_TYPE);

  newNoteModel = {
    title: "",
  };

  waitingCreation$ = new ReplaySubject<boolean>(1);

  constructor() {
    this.loadNoteGroup();
  }

  trackByFn(_index: number, item: INote) {
    return item.id;
  }

  copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
  }

  async addNote() {
    this.waitingCreation$.next(true);

    const group = await firstValueFrom(this.noteGroup$);
    const { error, note } = await this.noteService.add(group?.id!, {
      title: this.newNoteModel.title,
      status: NOTE_STATUS.PENDING,
      created: Date.now(),
      updated: Date.now(),
    });

    if (note) {
      this.newNoteModel.title = "";
      this.loadNoteGroup();
    } else {
      alert("Error adding note!!!");
      console.log("Error adding note", error.code, error.message);
    }

    this.waitingCreation$.next(false);
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
