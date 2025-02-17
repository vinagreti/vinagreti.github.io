import { INote } from "@services/note/note.types";
import { inject, Injectable } from "@angular/core";
import { FirebaseService } from "@services/firebase/firebase.service";
import { INoteGroup } from "./note.types";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore/lite";

@Injectable({
  providedIn: "root",
})
export class NoteService {
  firebaseService = inject(FirebaseService);

  collection = this.firebaseService.db("notes");

  async list() {
    const noteGroups = await this.firebaseService.list<INoteGroup>(
      this.collection,
      "title",
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
    const selectionQuery = query(notesCollection, orderBy("updated", "desc"));
    const notesSnapshot = await getDocs(selectionQuery);
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

  async add(
    groupId: string,
    doc: Omit<INote, "id">,
  ): Promise<{ note?: INote; error?: any }> {
    const noteGroup = await this.firebaseService.get<INoteGroup>(
      "notes",
      groupId,
    );
    const notesCollection = collection(noteGroup.snapshot.ref, "notes");
    return this.firebaseService.add<INote>(notesCollection, doc)
      .then((group) => {
        const note = group.item;
        return { note };
      })
      .catch((error) => {
        return Promise.resolve({ error });
      });
  }

  async addGroup(
    doc: Omit<INoteGroup, "id" | "notes">,
  ): Promise<{ noteGroup?: INoteGroup; error?: any }> {
    return this.firebaseService.add<INoteGroup>(this.collection, doc)
      .then((group) => {
        const noteGroup = group.item;
        return { noteGroup };
      })
      .catch((error) => {
        return Promise.resolve({ error });
      });
  }

  async deleteGroup(group: INoteGroup) {
    const confirmed = await confirm(
      `Do you want to remove group "${group.title}"`,
    );
    if (confirmed) {
      const noteGroup = await this.firebaseService.get<INoteGroup>(
        "notes",
        group.id,
      );
      const res = await deleteDoc(noteGroup.snapshot.ref);
      return res;
    } else {
      return undefined;
    }
  }

  async deleteNote(groupId: string, note: INote) {
    const confirmed = await confirm(
      `Do you want to remove note "${note.title}"`,
    );
    if (confirmed) {
      const noteGroup = await this.firebaseService.get<INoteGroup>(
        "notes",
        groupId,
      );
      const notesCollectionRef = collection(noteGroup.snapshot.ref, "notes");
      const docRef = doc(notesCollectionRef, note.id);
      const snapshot = await getDoc(docRef);
      const res = await deleteDoc(snapshot.ref);
      return res;
    } else {
      return undefined;
    }
  }

  async editGroup(group: INoteGroup) {
    const noteGroup = await this.firebaseService.get<INoteGroup>(
      "notes",
      group.id,
    );
    const res = await updateDoc(noteGroup.snapshot.ref, group);
    return res;
  }

  async editNote(groupId: string, note: INote) {
    const noteGroup = await this.firebaseService.get<INoteGroup>(
      "notes",
      groupId,
    );
    const notesCollectionRef = collection(noteGroup.snapshot.ref, "notes");
    const docRef = doc(notesCollectionRef, note.id);
    const snapshot = await getDoc(docRef);
    const res = await updateDoc(snapshot.ref, note);
    return res;
  }
}
