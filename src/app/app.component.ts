import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { IconComponent } from "@components/ui/icon/icon.component";
import { TemplateService } from "@services/template/template.service";
import { UserService } from "@services/user/user.service";
import { CoreModule } from "./core/core.module";
import { DropdownComponent } from "@components/ui/dropdown/dropdown.component";

@Component({
    selector: "app-root",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CoreModule,
        RouterOutlet,
        RouterLink,
        AsyncPipe,
        NgIf,
        IconComponent,
        DropdownComponent,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})
export class AppComponent {
  templateService = inject(TemplateService);

  userService = inject(UserService);

  user$ = this.userService.user$;

  async signOut() {
    await this.userService.signOut();
  }
}
