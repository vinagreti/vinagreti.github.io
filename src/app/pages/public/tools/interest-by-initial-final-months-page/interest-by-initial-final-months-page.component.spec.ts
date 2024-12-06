import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestByInitialFinalMonthsPageComponent } from './interest-by-initial-final-months-page.component';

describe('InterestByInitialFinalMonthsPageComponent', () => {
  let component: InterestByInitialFinalMonthsPageComponent;
  let fixture: ComponentFixture<InterestByInitialFinalMonthsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestByInitialFinalMonthsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestByInitialFinalMonthsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
