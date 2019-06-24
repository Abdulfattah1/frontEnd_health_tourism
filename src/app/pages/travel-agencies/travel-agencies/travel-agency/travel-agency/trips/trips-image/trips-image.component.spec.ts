import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsImageComponent } from './trips-image.component';

describe('TripsImageComponent', () => {
  let component: TripsImageComponent;
  let fixture: ComponentFixture<TripsImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
