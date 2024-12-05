import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from "@angular/core";

@Component({
  selector: "app-dropdown",
  standalone: true,
  imports: [],
  templateUrl: "./dropdown.component.html",
  styleUrl: "./dropdown.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  isMenuClosed = signal(true);

  dropdownRef = inject(ElementRef);

  @HostListener("document:click", ["$event.target"])
  clickOutside(target: any) {
    const targetNotWithinDropdown = !this.dropdownRef.nativeElement.contains(
      target,
    );
    if (targetNotWithinDropdown) {
      this.isMenuClosed.set(true);
    }
  }

  toggleMenu() {
    const isMenuClosed = this.isMenuClosed();
    this.isMenuClosed.set(!isMenuClosed);
  }
}
