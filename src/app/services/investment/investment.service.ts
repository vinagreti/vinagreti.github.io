import { inject, Injectable } from "@angular/core";
import { FirebaseService } from "@services/firebase/firebase.service";
import { IInvestment, IInvestmentDailyPosition } from "./investment.types";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore/lite";

@Injectable({
  providedIn: "root",
})
export class InvestmentService {
  firebaseService = inject(FirebaseService);

  collection = this.firebaseService.db("investment");

  async list() {
    const investments = await this.firebaseService.list<IInvestment>(
      this.collection,
    );
    const calls = investments.snapshot.docs.map((itemRef) =>
      this.get(itemRef.id)
    );
    const res = await Promise.all(calls);
    return res;
  }

  async delete(investment: IInvestment) {
    const confirmed = await confirm(
      `Do you want to remove investment "${investment.title}"`,
    );
    if (confirmed) {
      const investmentRef = await this.firebaseService.get<IInvestment>(
        "investment",
        investment.id,
      );
      const res = await deleteDoc(investmentRef.snapshot.ref);
      return res;
    } else {
      return undefined;
    }
  }

  async deleteDailyPosition(
    investmentId: string,
    dailyPosition: IInvestmentDailyPosition,
  ) {
    const confirmed = await confirm(
      `Do you want to remove the daily position "${dailyPosition.grossValue}/${dailyPosition.grossValue}"`,
    );
    if (confirmed) {
      const investment = await this.firebaseService.get<IInvestment>(
        "investment",
        investmentId,
      );
      const dailyPositionCollectionRef = collection(
        investment.snapshot.ref,
        "dailyPosition",
      );
      const docRef = doc(dailyPositionCollectionRef, dailyPosition.id);
      const snapshot = await getDoc(docRef);
      const res = await deleteDoc(snapshot.ref);
      return res;
    } else {
      return undefined;
    }
  }

  async add(
    doc: Omit<IInvestment, "id">,
  ): Promise<{ investment?: IInvestment; error?: any }> {
    return this.firebaseService.add<IInvestment>(this.collection, doc)
      .then((response) => {
        const investment = response.item;
        return { investment };
      })
      .catch((error) => {
        return Promise.resolve({ error });
      });
  }

  async get(investmentId: string) {
    const investment = await this.firebaseService.get<IInvestment>(
      "investment",
      investmentId,
    );
    const dailyPositionCollection = collection(
      investment.snapshot.ref,
      "dailyPosition",
    );
    const selectionQuery = query(
      dailyPositionCollection,
      orderBy("date", "desc"),
    );
    const dailyPositionSnapshot = await getDocs(selectionQuery);
    const dailyPosition = dailyPositionSnapshot.docs.map((dailyPositionRef) => {
      return {
        ...dailyPositionRef.data(),
        id: dailyPositionRef.id,
      } as IInvestmentDailyPosition;
    });
    const item = {
      ...investment.item,
      dailyPosition,
    } as IInvestment;
    return { snapshot: investment.snapshot, item };
  }

  async addDailyPosition(
    investmentId: string,
    doc: Omit<IInvestmentDailyPosition, "id">,
  ): Promise<{ item?: IInvestmentDailyPosition; error?: any }> {
    const investment = await this.firebaseService.get<IInvestment>(
      "investment",
      investmentId,
    );
    const investmentCollection = collection(
      investment.snapshot.ref,
      "dailyPosition",
    );
    return this.firebaseService.add<IInvestmentDailyPosition>(
      investmentCollection,
      doc,
    )
      .then((investment) => {
        const item = investment.item;
        return { item };
      })
      .catch((error) => {
        return Promise.resolve({ error });
      });
  }
}
