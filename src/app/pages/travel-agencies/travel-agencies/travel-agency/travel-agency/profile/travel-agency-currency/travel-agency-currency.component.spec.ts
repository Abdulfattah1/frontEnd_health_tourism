import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgencyCurrencyComponent } from './travel-agency-currency.component';

describe('TravelAgencyCurrencyComponent', () => {
  let component: TravelAgencyCurrencyComponent;
  let fixture: ComponentFixture<TravelAgencyCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgencyCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgencyCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
