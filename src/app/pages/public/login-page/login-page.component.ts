import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "@services/user/user.service";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-login-page",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, RouterModule, AsyncPipe],
    templateUrl: "./login-page.component.html",
    styleUrl: "./login-page.component.scss"
})
export class LoginPageComponent {
  private userService = inject(UserService);

  private router = inject(Router);

  email: string = "";

  password: string = "";

  waitingSigninResponse$ = new BehaviorSubject(false);

  async signInWithEmailAndPassword() {
    this.waitingSigninResponse$.next(true);
    const { user, error } = await this.userService.signInWithEmailAndPassword(
      this.email,
      this.password,
    );
    if (user) {
      this.router.navigate(["notes"]);
    } else {
      alert("Wrong credentials!!!");
    }
    this.waitingSigninResponse$.next(false);
  }
}
