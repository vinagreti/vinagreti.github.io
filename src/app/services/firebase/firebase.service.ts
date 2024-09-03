import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";

import { Injectable } from "@angular/core";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  WithFieldValue,
} from "firebase/firestore/lite";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  private app!: FirebaseApp;

  private analytics!: Analytics;

  private firestore!: Firestore;

  constructor() {
    this.connectToFirebase();
  }

  getAppName() {
    this.analytics.app.name;
    return this.analytics.app.name;
  }

  db(collectionName: string) {
    return collection(this.firestore, collectionName);
  }

  async list<T = any>(
    collection: CollectionReference<DocumentData, DocumentData>,
  ) {
    const snapshot = await getDocs(collection);
    const items = snapshot.docs.map((item) => item.data() as T);
    return { items, snapshot };
  }

  async get<T = any>(
    collectionName: string,
    id: string,
  ) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    const snapshot = await getDoc(docRef);
    return {
      snapshot,
      item: {
        id: snapshot.id,
        ...snapshot.data(),
      } as T,
    };
  }

  async add<T = any>(
    collection: CollectionReference<DocumentData, DocumentData>,
    doc: WithFieldValue<DocumentData>,
  ) {
    const snapshot = await addDoc(collection, doc);
    const item = await getDoc(snapshot) as T;
    return { item, snapshot };
  }

  private connectToFirebase() {
    this.app = initializeApp({
      apiKey: "AIzaSyCgp5M-pvtTB6GOiaJR-16-e-7ZC7m1BWM",
      authDomain: "brunojoao-465de.firebaseapp.com",
      projectId: "brunojoao-465de",
      storageBucket: "brunojoao-465de.appspot.com",
      messagingSenderId: "1035574691070",
      appId: "1:1035574691070:web:4a22525c8e610cdc16d1af",
      measurementId: "G-N7BTN8MV0Y",
    });
    this.analytics = getAnalytics(this.app);
    this.firestore = getFirestore(this.app);
  }
}
