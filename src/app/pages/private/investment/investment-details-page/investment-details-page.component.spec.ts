import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentDetailsPageComponent } from './investment-details-page.component';

describe('InvestmentDetailsPageComponent', () => {
  let component: InvestmentDetailsPageComponent;
  let fixture: ComponentFixture<InvestmentDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
