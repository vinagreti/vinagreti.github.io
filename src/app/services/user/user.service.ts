import { inject, Injectable } from "@angular/core";
import { FirebaseService } from "@services/firebase/firebase.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  firebaseService = inject(FirebaseService);

  collection = this.firebaseService.db("notes");

  list() {
    return this.firebaseService.list(this.collection);
  }
}
