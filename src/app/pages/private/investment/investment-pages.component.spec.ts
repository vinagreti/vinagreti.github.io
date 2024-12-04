import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentPagesComponent } from './investment-pages.component';

describe('InvestmentPagesComponent', () => {
  let component: InvestmentPagesComponent;
  let fixture: ComponentFixture<InvestmentPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
