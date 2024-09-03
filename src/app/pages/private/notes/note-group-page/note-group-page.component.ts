import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { BadgeComponent } from "@components/ui/badge/badge.component";
import { NoteService } from "@services/note/note.service";
import { INoteGroup } from "@services/note/note.types";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-note-group-page",
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterModule, BadgeComponent],
  templateUrl: "./note-group-page.component.html",
  styleUrl: "./note-group-page.component.scss",
})
export class NoteGroupPageComponent {
  noteService = inject(NoteService);

  route = inject(ActivatedRoute);

  noteGroup$ = new BehaviorSubject<INoteGroup | null>(null);

  constructor() {
    this.loadNoteGroup();
  }

  private async loadNoteGroup() {
    const noteGroupId = this.route.snapshot.params["noteGroupId"];
    const noteGroup = await this.noteService.group(noteGroupId);
    this.noteGroup$.next(noteGroup);
  }
}
