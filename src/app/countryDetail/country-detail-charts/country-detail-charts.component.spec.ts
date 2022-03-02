import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailChartsComponent } from './country-detail-charts.component';

describe('CountryDetailChartsComponent', () => {
  let component: CountryDetailChartsComponent;
  let fixture: ComponentFixture<CountryDetailChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryDetailChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
