import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NoteService } from "@services/note/note.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-note-add-page",
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: "./note-add-page.component.html",
  styleUrl: "./note-add-page.component.scss",
})
export class NoteAddPageComponent {
  private noteService = inject(NoteService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  title: string = "";

  content: string = "";

  waitingCreation$ = new BehaviorSubject(false);

  async addNote() {
    this.waitingCreation$.next(true);
    const noteGroupId = this.route.snapshot.params["noteGroupId"];
    const { error, note } = await this.noteService.add(noteGroupId, {
      title: this.title,
      content: this.content,
    });
    if (note) {
      await this.router.navigate(["/notes", noteGroupId]);
      this.router.navigate(["/notes", noteGroupId, note.id]);
    } else {
      alert("Error adding note group!!!");
      console.log("Error adding note group", error.code, error.message);
    }
    this.waitingCreation$.next(false);
  }
}
