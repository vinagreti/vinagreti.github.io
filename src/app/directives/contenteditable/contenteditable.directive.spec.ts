import { ContenteditableDirective } from "./contenteditable.directive";

describe("ContenteditableDirective", () => {
  it("should create an instance", () => {
    const directive = new ContenteditableDirective(
      {} as any, //private elementRef: ElementRef,
      {} as any, //private renderer: Renderer2,
      {} as any, //@Attribute("unformattedPaste") private unformattedPaste: string,
      {} as any, //@Inject(DOCUMENT) private document: Document,
    );
    expect(directive).toBeTruthy();
  });
});
