import { inject, Injectable } from "@angular/core";
import { FirebaseService } from "@services/firebase/firebase.service";
import { INote, INoteGroup } from "./note.types";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";

@Injectable({
  providedIn: "root",
})
export class NoteService {
  firebaseService = inject(FirebaseService);

  collection = this.firebaseService.db("notes");

  async list() {
    const noteGroups = await this.firebaseService.list<INoteGroup>(
      this.collection,
    );
    return noteGroups.snapshot.docs.map((itemRef, index) => {
      const item = itemRef.data() as INoteGroup;
      return {
        ...item,
        id: itemRef.id,
      };
    });
  }

  async group(groupId: string) {
    const noteGroup = await this.firebaseService.get<INoteGroup>(
      "notes",
      groupId,
    );
    const notesCollection = collection(noteGroup.snapshot.ref, "notes");
    const notesSnapshot = await getDocs(notesCollection);
    const notes = notesSnapshot.docs.map((noteRef) => {
      return {
        ...noteRef.data(),
        id: noteRef.id,
      } as INote;
    });
    const result = {
      ...noteGroup.item,
      notes,
    } as INoteGroup;
    return result;
  }

  async note(groupId: string, noteId: string) {
    const noteGroup = await this.firebaseService.get<INoteGroup>(
      "notes",
      groupId,
    );
    const notesCollectionRef = collection(noteGroup.snapshot.ref, "notes");

    const docRef = doc(notesCollectionRef, noteId);

    const snapshot = await getDoc(docRef);

    if (snapshot) {
      return {
        snapshot,
        item: {
          ...snapshot.data(),
          id: snapshot.id,
        } as INote,
      };
    } else {
      return null;
    }
  }
}
