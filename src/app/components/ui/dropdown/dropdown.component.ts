import { NgStyle } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from "@angular/core";

@Component({
    selector: "app-dropdown",
    imports: [NgStyle],
    templateUrl: "./dropdown.component.html",
    styleUrl: "./dropdown.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  isMenuClosed = signal(true);

  dropdownRef = inject(ElementRef);

  title = input<string>("#");

  avoidOverflowLeft = input<boolean>(false);

  avoidOverflowRight = input<boolean>(false);

  closeOnClick = input<boolean>(true);

  buttonUid = `dropdown-${Date.now()}-${Date.now()}`;

  @HostListener("document:click", ["$event.target"])
  clickOutside(target: any) {
    const targetNotButton = !target.matches(`#${this.buttonUid}`);
    if (targetNotButton) {
      const closeOnClick = this.closeOnClick();
      const targetOutsideDropdown = !this.dropdownRef.nativeElement.contains(
        target,
      );
      if (closeOnClick || targetOutsideDropdown) {
        this.isMenuClosed.set(true);
      }
    }
  }

  toggleMenu() {
    const isMenuClosed = this.isMenuClosed();
    this.isMenuClosed.set(!isMenuClosed);
  }
}
