import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "@services/user/user.service";
import { filter, take } from "rxjs";

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {
  private userService = inject(UserService);

  private router = inject(Router);

  email: string = "";

  password: string = "";

  constructor() {
    this.redirectWhenLogged();
  }

  signInWithEmailAndPassword() {
    this.userService.signInWithEmailAndPassword(this.email, this.password);
  }

  private redirectWhenLogged() {
    this.userService.user$.pipe(filter(Boolean), take(1)).subscribe((user) => {
      this.router.navigate(["notes"]);
    });
  }
}
