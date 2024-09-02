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

  signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<{ user?: any; error?: any }> {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return { user };
      })
      .catch((error) => {
        return Promise.resolve({ error });
      });
  }

  signOut() {
    const auth = getAuth();
    return auth.signOut();
  }

  private getUserSession() {
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
