import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentListPageComponent } from './investment-list-page.component';

describe('InvestmentListPageComponent', () => {
  let component: InvestmentListPageComponent;
  let fixture: ComponentFixture<InvestmentListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
