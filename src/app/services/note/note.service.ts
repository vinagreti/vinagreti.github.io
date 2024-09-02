import { inject, Injectable } from "@angular/core";
import { FirebaseService } from "@services/firebase/firebase.service";
import { INote } from "./note.types";

@Injectable({
  providedIn: "root",
})
export class NoteService {
  firebaseService = inject(FirebaseService);

  collection = this.firebaseService.db("notes");

  list() {
    return this.firebaseService.list<INote>(this.collection);
  }
}
