import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgenciesTableComponent } from './travel-agencies-table.component';

describe('TravelAgenciesTableComponent', () => {
  let component: TravelAgenciesTableComponent;
  let fixture: ComponentFixture<TravelAgenciesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgenciesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgenciesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
