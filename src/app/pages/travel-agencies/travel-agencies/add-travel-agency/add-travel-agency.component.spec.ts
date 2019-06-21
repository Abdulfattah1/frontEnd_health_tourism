import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelAgencyComponent } from './add-travel-agency.component';

describe('AddTravelAgencyComponent', () => {
  let component: AddTravelAgencyComponent;
  let fixture: ComponentFixture<AddTravelAgencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTravelAgencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTravelAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
