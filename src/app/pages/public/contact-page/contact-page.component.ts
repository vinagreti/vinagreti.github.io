import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";

@Component({
    selector: "app-contact-page",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PageWrapperComponent],
    templateUrl: "./contact-page.component.html",
    styleUrl: "./contact-page.component.scss"
})
export class ContactPageComponent {
}
