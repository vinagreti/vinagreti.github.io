import { AsyncPipe, NgFor } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PageWrapperComponent } from "@components/ui/page-wrapper/page-wrapper.component";
import { NoteService } from "@services/note/note.service";
import {
  INoteGroup,
  NOTE_GROUP_TYPE,
  NOTE_STATUS,
} from "@services/note/note.types";
import { ReplaySubject } from "rxjs";
import { ContenteditableDirective } from "../../../../directives/contenteditable/contenteditable.directive";

@Component({
  selector: "app-note-add-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FormsModule,
    NgFor,
    PageWrapperComponent,
    ContenteditableDirective,
  ],
  templateUrl: "./note-add-page.component.html",
  styleUrl: "./note-add-page.component.scss",
})
export class NoteAddPageComponent {
  @ViewChild("contentInput", { static: false })
  contentInput!: ElementRef<HTMLDivElement>;

  @HostListener("paste", ["$event"])
  onPaste = async (event: ClipboardEvent) => {
    const { clipboardData } = event;
    const selection = window.getSelection()!;
    event.preventDefault();
    if (clipboardData && selection) {
      const items = clipboardData.items;
      // @ts-ignore: Unreachable type error
      for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
          await this.getImageFileFromClipBoardAndCreateABase64Image(
            item,
            selection,
          );
        } else if (item.type === "text/plain") {
          // Handle text paste
          const text: string = await new Promise((resolve) => {
            item.getAsString(resolve);
          });
          this.insertAtCursor(document.createTextNode(text));
        }
      }
      this.htmlContent = this.contentInput.nativeElement.innerHTML;
    }
  };

  private noteService = inject(NoteService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  title: string = "";

  content: string = "";

  htmlContent: string = "";

  noteStatus: NOTE_STATUS = NOTE_STATUS.PENDING;

  noteGroupType = NOTE_GROUP_TYPE;

  groupId: string = this.route.snapshot.params["noteGroupId"];

  noteGroup: string = this.groupId;

  waitingCreation$ = new ReplaySubject<boolean>(1);

  noteGroups$ = new ReplaySubject<INoteGroup[]>(1);

  noteGroup$ = new ReplaySubject<INoteGroup>(1);

  noteStatuses = Object.values(NOTE_STATUS);

  constructor() {
    this.loadNoteGroups();
    this.loadNoteGroup();
  }

  private async loadNoteGroup() {
    const noteGroup = await this.noteService.group(this.groupId);
    this.noteGroup$.next(noteGroup);
  }

  private async loadNoteGroups() {
    const noteGroups = await this.noteService.list();
    this.noteGroups$.next(noteGroups);
  }

  async addNote() {
    this.waitingCreation$.next(true);

    const { error, note } = await this.noteService.add(this.noteGroup, {
      title: this.title,
      content: this.htmlContent,
      status: this.noteStatus,
      created: Date.now(),
      updated: Date.now(),
    });

    if (note) {
      this.router.navigate(["/notes", this.noteGroup]);
    } else {
      alert("Error adding note!!!");
      console.log("Error adding note", error.code, error.message);
    }

    this.waitingCreation$.next(false);
  }

  private insertAtCursor = (node: Text) => {
    const selection = window.getSelection()!;
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(node);

      this.moveCursorToEnd(node, selection);
    }
  };

  private moveCursorToEnd(node: any, selection: Selection) {
    // Move cursor to end of inserted content
    const newRange = document.createRange();
    newRange.setStartAfter(node);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  private async getImageFileFromClipBoardAndCreateABase64Image(
    item: DataTransferItem,
    selection: Selection,
  ) {
    // create a blob from print file
    const blob = item.getAsFile()!;
    const reader = new FileReader();
    const base64Image = await new Promise<string>((resolve) => {
      reader.onload = (e) => {
        const dataURL: any = reader.result!;
        const base64: string = dataURL.slice(dataURL.indexOf(",") + 1);
        resolve(base64);
      };
      reader.readAsDataURL(blob);
    });
    // Create and image from blob
    const img = document.createElement("img");
    img.src = `data:image/png;base64, ${base64Image}`;
    // Insert blob image at cursor position
    const range = selection.getRangeAt(0);
    range.insertNode(img);
  }
}
