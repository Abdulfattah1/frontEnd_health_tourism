import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgencyInformationComponent } from './travel-agency-information.component';

describe('TravelAgencyInformationComponent', () => {
  let component: TravelAgencyInformationComponent;
  let fixture: ComponentFixture<TravelAgencyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgencyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgencyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
