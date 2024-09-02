import { inject, Injectable } from "@angular/core";
import { FirebaseService } from "@services/firebase/firebase.service";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { BehaviorSubject } from "rxjs";
import { IUser } from "./user.models";

@Injectable({
  providedIn: "root",
})
export class UserService {
  firebaseService = inject(FirebaseService);

  collection = this.firebaseService.db("notes");

  user$ = new BehaviorSubject<{ snapshoot: User; user: IUser } | null>(null);

  constructor() {
    this.getUserSession();
  }

  list() {
    return this.firebaseService.list(this.collection);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  signOut() {
    const auth = getAuth();
    return auth.signOut();
  }

  private getUserSession() {
    // Confirm the link is a sign-in with email link.
    const auth = getAuth();
    onAuthStateChanged(auth, (snapshoot) => {
      if (snapshoot) {
        const user = snapshoot.toJSON() as IUser;
        this.user$.next({ snapshoot, user });
      } else {
        this.user$.next(null);
      }
    });
  }
}
