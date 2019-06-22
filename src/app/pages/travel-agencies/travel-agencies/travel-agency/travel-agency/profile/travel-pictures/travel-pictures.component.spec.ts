import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPicturesComponent } from './travel-pictures.component';

describe('TravelPicturesComponent', () => {
  let component: TravelPicturesComponent;
  let fixture: ComponentFixture<TravelPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
