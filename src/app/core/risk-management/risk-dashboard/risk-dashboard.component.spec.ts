import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskDashboardComponent } from './risk-dashboard.component';

describe('RiskDashboardComponent', () => {
  let component: RiskDashboardComponent;
  let fixture: ComponentFixture<RiskDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiskDashboardComponent]
    });
    fixture = TestBed.createComponent(RiskDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
