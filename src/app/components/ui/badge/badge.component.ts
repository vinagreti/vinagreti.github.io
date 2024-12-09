import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-badge",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    templateUrl: "./badge.component.html",
    styleUrl: "./badge.component.scss"
})
export class BadgeComponent {
}
