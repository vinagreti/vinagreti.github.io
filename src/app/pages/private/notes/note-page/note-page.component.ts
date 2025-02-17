import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";
import { NoteService } from "@services/note/note.service";
import { INote } from "@services/note/note.types";
import { BehaviorSubject, firstValueFrom, map } from "rxjs";

@Component({
  selector: "app-note-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, RouterModule, PageWrapperComponent],
  templateUrl: "./note-page.component.html",
  styleUrl: "./note-page.component.scss",
})
export class NotePageComponent {
  noteService = inject(NoteService);

  route = inject(ActivatedRoute);

  note$ = new BehaviorSubject<INote | null>(null);

  noteGroupId$ = this.route.params.pipe(
    map((params) => params["noteGroupId"]),
  );

  noteId$ = this.route.params.pipe(map((params) => params["noteId"]));

  constructor() {
    this.loadNote();
  }

  private async loadNote() {
    const noteGroupId = await firstValueFrom(this.noteGroupId$);
    const noteId = await firstValueFrom(this.noteId$);
    const noteRef = await this.noteService.note(
      noteGroupId,
      noteId,
    );
    if (noteRef?.item) {
      this.note$.next(noteRef.item);
    }
  }
}
