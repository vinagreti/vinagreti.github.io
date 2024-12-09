import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-home-page",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink],
    templateUrl: "./home-page.component.html",
    styleUrl: "./home-page.component.scss"
})
export class HomePageComponent {
}
