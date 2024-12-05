import { inject, Injectable } from "@angular/core";
import { FirebaseService } from "@services/firebase/firebase.service";
import { IInvestment, IInvestmentDailyPosition } from "./investment.types";
import {
  collection,
  deleteDoc,
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
    return investments.snapshot.docs.map((itemRef, index) => {
      const item = itemRef.data() as IInvestment;
      return {
        ...item,
        id: itemRef.id,
      };
    });
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
