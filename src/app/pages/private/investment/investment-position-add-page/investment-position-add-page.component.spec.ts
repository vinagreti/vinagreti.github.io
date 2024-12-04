import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentPositionAddPageComponent } from './investment-position-add-page.component';

describe('InvestmentPositionAddPageComponent', () => {
  let component: InvestmentPositionAddPageComponent;
  let fixture: ComponentFixture<InvestmentPositionAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentPositionAddPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentPositionAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
