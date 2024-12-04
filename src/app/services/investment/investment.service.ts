import { inject, Injectable } from "@angular/core";
import { FirebaseService } from "@services/firebase/firebase.service";
import { IInvestment } from "./investment.types";
import { deleteDoc } from "firebase/firestore/lite";

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
    return investment;
  }
}
