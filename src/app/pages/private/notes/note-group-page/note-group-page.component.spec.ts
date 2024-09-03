import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteGroupPageComponent } from './note-group-page.component';

describe('NoteGroupPageComponent', () => {
  let component: NoteGroupPageComponent;
  let fixture: ComponentFixture<NoteGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteGroupPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
