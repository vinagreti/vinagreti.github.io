import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInterestPageComponent } from './compound-interest-page.component';

describe('CompoundInterestPageComponent', () => {
  let component: CompoundInterestPageComponent;
  let fixture: ComponentFixture<CompoundInterestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundInterestPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundInterestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
