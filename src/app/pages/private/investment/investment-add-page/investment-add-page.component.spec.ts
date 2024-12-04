import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentAddPageComponent } from './investment-add-page.component';

describe('InvestmentAddPageComponent', () => {
  let component: InvestmentAddPageComponent;
  let fixture: ComponentFixture<InvestmentAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentAddPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
