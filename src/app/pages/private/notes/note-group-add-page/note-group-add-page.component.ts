import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { NoteService } from "@services/note/note.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-note-group-add-page",
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: "./note-group-add-page.component.html",
  styleUrl: "./note-group-add-page.component.scss",
})
export class NoteGroupAddPageComponent {
  private noteService = inject(NoteService);

  private router = inject(Router);

  title: string = "";

  waitingCreation$ = new BehaviorSubject(false);

  async addNoteGroup() {
    this.waitingCreation$.next(true);
    const { error, noteGroup } = await this.noteService.add(this.title);
    if (noteGroup) {
      this.router.navigate(["/notes", noteGroup.id]);
    } else {
      alert("Error adding note group!!!");
      console.log("Error adding note group", error.code, error.message);
    }
    this.waitingCreation$.next(false);
  }
}
