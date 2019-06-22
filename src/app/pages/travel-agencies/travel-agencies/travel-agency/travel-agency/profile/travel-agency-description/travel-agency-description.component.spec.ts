import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgencyDescriptionComponent } from './travel-agency-description.component';

describe('TravelAgencyDescriptionComponent', () => {
  let component: TravelAgencyDescriptionComponent;
  let fixture: ComponentFixture<TravelAgencyDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgencyDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgencyDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
