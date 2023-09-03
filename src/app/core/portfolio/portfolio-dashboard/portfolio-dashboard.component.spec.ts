import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDashboardComponent } from './portfolio-dashboard.component';

describe('PortfolioDashboardComponent', () => {
  let component: PortfolioDashboardComponent;
  let fixture: ComponentFixture<PortfolioDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioDashboardComponent]
    });
    fixture = TestBed.createComponent(PortfolioDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
