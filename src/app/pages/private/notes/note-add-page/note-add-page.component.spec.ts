import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteAddPageComponent } from './note-add-page.component';

describe('NoteAddPageComponent', () => {
  let component: NoteAddPageComponent;
  let fixture: ComponentFixture<NoteAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteAddPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
