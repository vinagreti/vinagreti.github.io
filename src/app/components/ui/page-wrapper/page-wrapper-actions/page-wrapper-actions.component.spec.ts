import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWrapperActionsComponent } from './page-wrapper-actions.component';

describe('PageWrapperActionsComponent', () => {
  let component: PageWrapperActionsComponent;
  let fixture: ComponentFixture<PageWrapperActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageWrapperActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageWrapperActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
