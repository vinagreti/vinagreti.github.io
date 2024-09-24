import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { IconComponent } from "@components/ui/icon/icon.component";
import { TemplateService } from "@services/template/template.service";
import { UserService } from "@services/user/user.service";

@Component({
  selector: "app-root",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, AsyncPipe, NgIf, IconComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  templateService = inject(TemplateService);

  userService = inject(UserService);

  user$ = this.userService.user$;

  async signOut() {
    await this.userService.signOut();
  }
}
