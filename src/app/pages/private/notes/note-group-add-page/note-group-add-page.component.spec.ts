import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteGroupAddPageComponent } from './note-group-add-page.component';

describe('NoteGroupAddPageComponent', () => {
  let component: NoteGroupAddPageComponent;
  let fixture: ComponentFixture<NoteGroupAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteGroupAddPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteGroupAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
